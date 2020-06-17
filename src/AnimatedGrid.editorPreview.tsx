import { Component, ReactNode, createElement } from "react";
import { AnimatedGridPreviewProps } from "../typings/AnimatedGridProps";

declare function require(name: string): string;

export class preview extends Component<AnimatedGridPreviewProps> {
    render(): ReactNode {
        return <div>Preview unavailable</div>;
    }
}

export function getPreviewCss(): string {
    return require("./ui/AnimatedGrid.scss");
}
