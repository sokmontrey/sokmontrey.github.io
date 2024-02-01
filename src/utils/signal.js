//ts-check
import { tweened } from "svelte/motion";
import { cubicInOut } from "svelte/easing";
import { interpolate } from "d3-interpolate";
import { get } from "svelte/store";

/** @typedef {Object} Signal
 * @property {Function} to - Animate to a new value. BUT push the animation to a queue enabling async/await.
 * @property {Function} then - Execute all queued animations.
 * @property {Function} toNow - Animate to a new value instantly.
 * @property {Function} subscribe - Subscribe to the store.
 * @property {Function} update - Update the store.
 * @property {Function} set - Set the store.
 */

/** Heavily inspired by: "Making The Best Svelte SVG Animation Library",
 * https://www.youtube.com/watch?v=_jWnyJRKOvU
 *
 * A wrapper around svelte motion store (tweened, spring, etc)
 * for easier animating values. Supports both scalar and object
 * values. And also async/await.
 *
 * @template T
 * @param {T} value - Initial value.
 * @param {Object} opts - Options for svelte/motion store.
 * @param {Function} motion_func - One of svelte motion store (tweened, spring, etc).
 *
 * @returns {Signal} - A new Signal instance.
 *
 * @example
 * const signal = signal(0);
 * const signal = signal({ x: 0, y: 0 });
 */
export default function signal(
	value,
	opts = { duration: 1000, easing: cubicInOut, interpolate },
	motion_func = tweened,
) {
	const _store = motion_func(value, opts);
	let _tasks = [];

	/** Animate to a new value. BUT push the animation to a queue enabling async/await.
	 *
	 * @param {T} values - Values to animate to.
	 * @param {Function} values - Function that returns values to animate to.
	 * @param {Object} opts - Options for svelte/motion store.
	 *
	 * @returns {Signal} - The same Signal instance.
	 *
	 * @example
	 * await signal.to(1);
	 * await signal.to({ x: 1 }); //allows patially/fully updating object values
	 */
	function to(values, opts = {}) {
		_tasks.push(_getUpdateFunction(_calculateValue(values), opts));
		return this;
	}

	/** Animate to a new value instantly.
	 *
	 * @param {T} values - Values to animate to.
	 * @param {Function} values - Function that returns values to animate to.
	 * @param {Object} opts - Options for svelte/motion store.
	 *
	 * @returns {Signal} - The same Signal instance.
	 *
	 * @example
	 * signal.toNow(1);
	 * signal.toNow({ x: 1 }); //allows patially/fully updating object values
	 */
	function toNow(values, opts = {}) {
		_getUpdateFunction(_calculateValue(values), { ...opts, duration: 0 })(); //<-- call the update function
		return this;
	}

	/** Enable thenable for executing all queued animations.
	 *
	 * @param {Function} resolve - Function to call when all animations are done.
	 * @param {Function} reject - Function to call when an error occurs.
	 * @returns {Promise} - A promise.
	 */
	async function then(resolve = () => { }, reject = () => { }) {
		for (const task of _tasks) {
			await task();
		}
		_tasks = [];
		resolve();
	}

	/** Use to determine the values to animate to.
	 *
	 * @private
	 * @param {T} values - Values to animate to.
	 * @param {Function} values - Function that returns values to animate to.
	 * @param {Object} opts - Options for svelte/motion store.
	 *
	 * @returns {T} - Values to animate to.
	 */
	function _calculateValue(values) {
		return values instanceof Function ? values(get(_store)) : values;
	}

	/** Animate to a new value depending on the type of value.
	 *
	 * @private
	 * @param {T} values - Values to animate to.
	 *
	 * @returns {Function} - Corresponding update function.
	 */
	function _getUpdateFunction(values, opts = {}) {
		return values instanceof Object
			? () => _store.update((prev) => ({ ...prev, ...values }), opts)
			: () => _store.set(values, opts);
	}

	return {
		to,
		toNow,
		then,
		subscribe: _store.subscribe,
		update: _store.update,
		set: _store.set,
	};
}

export function all(...events) {
	return Promise.all(events);
}

export function delay(delay) {
	return new Promise((resolve) => setTimeout(resolve, delay));
}
