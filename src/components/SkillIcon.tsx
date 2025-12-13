import {
    SiHtml5,
    SiCss3,
    SiJavascript,
    SiGo,
    SiPython,
    SiReact,
    SiFirebase,
    SiSupabase,
    SiSvelte,
    SiJquery,
    SiTailwindcss,
    SiBootstrap,
    SiDotnet,
    SiPostgresql,
    SiPhp,
    SiCplusplus,
    SiGit,
    SiTensorflow,
    SiPytorch,
    SiNodedotjs,
    SiAstro
} from "react-icons/si";
import { TbBrandCSharp } from "react-icons/tb";
import { FaJava } from "react-icons/fa";

const IconMap: Record<string, any> = {
    SiHtml5,
    SiCss3,
    SiJavascript,
    SiGo,
    SiPython,
    SiReact,
    SiFirebase,
    SiSupabase,
    SiSvelte,
    SiJquery,
    SiTailwindcss,
    SiBootstrap,
    SiDotnet,
    SiPostgresql,
    SiPhp,
    SiCplusplus,
    SiGit,
    SiTensorflow,
    // SiKeras, // Uncomment if used
    SiPytorch,
    SiNodedotjs,
    SiAstro,
    TbBrandCSharp,
    FaJava
};

export default function SkillIcon({ icon }: { icon: string }) {
    const Icon = IconMap[icon];
    if (!Icon) {
        console.warn(`Icon ${icon} not found in IconMap`);
        return null;
    }
    return <Icon />;
}
