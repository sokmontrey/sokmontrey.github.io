//ts-check
import { tweened } from "svelte/motion";
import { cubicInOut } from "svelte/easing";
import { interpolate } from "d3-interpolate";

/**
  * @typedef {Object} Signal 
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
  motion_func = tweened
) {
  const _store = motion_func(value, opts);
  const _tasks = [];

  /** Animate to a new value. BUT push the animation to a queue
    * enabling async/await.
    *
    * @param {T} values - Values to animate to.
    * @param {Object} opts - Options for svelte/motion store.
    * @returns {Signal} - The same Signal instance.
    * @example
    * await signal.to(1);
    * await signal.to({ x: 1 }); //allows patially/fully updating object values
    */
  function to(values, opts = {}) {
    _tasks.push(() =>
      values instanceof Object
        ? _updateObject(values, opts)
        : _updateScalar(values, opts),
    );
    return this;
  }

  /** Execute all queued animations.
    *
    * @param {Function} resolve - Callback to execute when all animations are done.
    * @returns {Signal} - The same Signal instance.
    * @example
    * await signal.to(1).then(() => console.log('done'));
    */
  async function then(resolve) {
    for (const task of _tasks) {
      await task();
    }
    _tasks = [];
    resolve();
    return this;
  }

  /** Animate to a new value instantly.
    *
    * @param {T} values - Values to animate to.
    * @param {Object} opts - Options for svelte/motion store.
    * @returns {Signal} - The same Signal instance.
    * @example
    * signal.toNow(1);
    * signal.toNow({ x: 1 }); //allows patially/fully updating object values
    */
  function toNow(values, opts = {}) {
    if (values instanceof Object) {
      _updateObject(values, opts);
    } else {
      _updateScalar(values, opts);
    }
    return this;
  }

  /** Use to animate object value(s).
    *
    * @private
    * @param {T} values - Values to animate to.
    * @param {Object} opts - Options for svelte/motion store.
    * @returns {Signal} - The same Signal instance.
    * @example
    * this._updateObject({ x: 1 });
    */
  function _updateObject(values, opts = {}) {
    _store.update((prev) => {
      return { ...prev, ...values };
    }, opts);
  }

  /** Use to animate scalar
    *
    * @private
    * @param {T} values - Values to animate to.
    * @param {Object} opts - Options for svelte/motion store.
    * @returns {Signal} - The same Signal instance.
    * @example
    * this._updateScalar(1);
    */
  function _updateScalar(values, opts = {}) {
    _store.set(values, opts);
  }

  return {
    to,
    then,
    toNow,
    subscribe: _store.subscribe,
    update: _store.update,
    set: _store.set,
  };
}
