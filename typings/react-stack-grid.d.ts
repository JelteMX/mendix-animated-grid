declare module 'react-stack-grid' {
    import * as React from 'react';

    type RectProps = { top: number; left: number; width: number; height: number; }
    type ContainerSize = { width: number; height: number; }

    type AnimationFunc = (rect?: RectProps, containerSize?: ContainerSize, index?: number) => any

    type GridPropTypes = {
        className?: string
        style?: any,
        gridRef?: ((grid: StackGrid) => any) | null,
        component?: string,
        itemComponent?: string,
        columnWidth: number | string,
        gutterWidth?: number,
        gutterHeight?: number,
        duration?: number,
        easing?: string,
        appearDelay?: number,
        appear?: AnimationFunc,
        appeared?: AnimationFunc,
        enter?: AnimationFunc,
        entered?: AnimationFunc,
        leaved?: AnimationFunc,
        units?: any,
        monitorImagesLoaded?: boolean,
        vendorPrefix?: boolean,
        userAgent?: string,
        enableSSR?: boolean,
        onLayout?: any,
        horizontal?: boolean,
        rtl?: boolean
    }

    export const easings = {
        linear : 'linear',
        easeIn : 'ease-in',
        easeOut : 'ease-out',
        easeInOut : 'ease-in-out',
        sineIn : 'cubic-bezier(0.47, 0, 0.745, 0.715)',
        sineOut : 'cubic-bezier(0.39, 0.575, 0.565, 1)',
        sineInOut : 'cubic-bezier(0.445, 0.05, 0.55, 0.95)',
        quadIn : 'cubic-bezier(0.55, 0.085, 0.68, 0.53)',
        quadOut : 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        quadInOut : 'cubic-bezier(0.455, 0.03, 0.515, 0.955)',
        cubicIn : 'cubic-bezier(0.55, 0.055, 0.675, 0.19)',
        cubicOut : 'cubic-bezier(0.215, 0.61, 0.355, 1)',
        cubicInOut : 'cubic-bezier(0.645, 0.045, 0.355, 1)',
        quartIn : 'cubic-bezier(0.895, 0.03, 0.685, 0.22)',
        quartOut : 'cubic-bezier(0.165, 0.84, 0.44, 1)',
        quartInOut : 'cubic-bezier(0.77, 0, 0.175, 1)',
        quintIn : 'cubic-bezier(0.755, 0.05, 0.855, 0.06)',
        quintOut : 'cubic-bezier(0.23, 1, 0.32, 1)',
        quintInOut : 'cubic-bezier(0.86, 0, 0.07, 1)',
        expoIn : 'cubic-bezier(0.95, 0.05, 0.795, 0.035)',
        expoOut : 'cubic-bezier(0.19, 1, 0.22, 1)',
        expoInOut : 'cubic-bezier(1, 0, 0, 1)',
        circIn : 'cubic-bezier(0.6, 0.04, 0.98, 0.335)',
        circOut : 'cubic-bezier(0.075, 0.82, 0.165, 1)',
        circInOut : 'cubic-bezier(0.785, 0.135, 0.15, 0.86)',
        backIn : 'cubic-bezier(0.6, -0.28, 0.735, 0.045)',
        backOut : 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        backInOut : 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    }

    export type Animations = {
        appear: AnimationFunc,
        appeared: AnimationFunc,
        enter: AnimationFunc,
        entered: AnimationFunc,
        leaved: AnimationFunc,
    }

    const AnimationObject: Animations = {
        appear: () => any,
        appeared: () => any,
        enter: () => any,
        entered: () => any,
        leaved: () => any
    };

    export const transitions = {
        fade: AnimationObject,
        fadeDown: AnimationObject,
        fadeUp: AnimationObject,
        scaleDown: AnimationObject,
        scaleUp: AnimationObject,
        flip: AnimationObject,
        helix: AnimationObject,
    }

    class StackGrid extends React.Component<GridPropTypes> {
        updateLayout: () => void;
    }

    export default StackGrid;
}
