/**
 * This file was generated from AnimatedGrid.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { ComponentType, CSSProperties, ReactNode } from "react";
import { ListValue, ObjectItem } from "mendix";

export type UiEasingEnum = "linear" | "easeIn" | "easeOut" | "easeInOut" | "sineIn" | "sineOut" | "sineInOut" | "quadIn" | "quadOut" | "quadInOut" | "cubicIn" | "cubicOut" | "cubicInOut" | "quartIn" | "quartOut" | "quartInOut" | "quintIn" | "quintOut" | "quintInOut" | "expoIn" | "expoOut" | "expoInOut" | "circIn" | "circOut" | "circInOut" | "backIn" | "backOut" | "backInOut";

export type UiTransitionEnum = "fade" | "fadeDown" | "fadeUp" | "scaleDown" | "scaleUp" | "flip" | "helix";

export interface UiSizesType {
    sizeBreakPoint: number;
    sizeBreakPointID: string;
    sizeColumnWidth: string;
    sizeGutterWidth: number;
    sizeGutterHeight: number;
}

export interface UiSizesPreviewType {
    sizeBreakPoint: number | null;
    sizeBreakPointID: string;
    sizeColumnWidth: string;
    sizeGutterWidth: number | null;
    sizeGutterHeight: number | null;
}

export interface AnimatedGridContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex: number;
    dataSource: ListValue;
    elements: (item: ObjectItem) => ReactNode;
    uiMonitorImagesLoaded: boolean;
    uiVendorPrefix: boolean;
    uiComponent: string;
    uiItemComponent: string;
    uiColumnWidth: string;
    uiGutterWidth: number;
    uiGutterHeight: number;
    uiDuration: number;
    uiEasing: UiEasingEnum;
    uiAppearDelay: number;
    uiTransition: UiTransitionEnum;
    uiHorizontal: boolean;
    uiRTL: boolean;
    uiItemWrapDiv: boolean;
    uiItemWrapClass?: string;
    uiSizes: UiSizesType[];
}

export interface AnimatedGridPreviewProps {
    class: string;
    style: string;
    dataSource: {} | null;
    elements: { widgetCount: number; renderer: ComponentType };
    uiMonitorImagesLoaded: boolean;
    uiVendorPrefix: boolean;
    uiComponent: string;
    uiItemComponent: string;
    uiColumnWidth: string;
    uiGutterWidth: number | null;
    uiGutterHeight: number | null;
    uiDuration: number | null;
    uiEasing: UiEasingEnum;
    uiAppearDelay: number | null;
    uiTransition: UiTransitionEnum;
    uiHorizontal: boolean;
    uiRTL: boolean;
    uiItemWrapDiv: boolean;
    uiItemWrapClass: string;
    uiSizes: UiSizesPreviewType[];
}
