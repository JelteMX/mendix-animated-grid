import { FunctionComponent, createElement, useState, useEffect } from "react";
import { hot } from "react-hot-loader/root";
import { AnimatedGridContainerProps } from "../typings/AnimatedGridProps";
import { ObjectItem } from "mendix";
import StackGrid, { easings, transitions } from "react-stack-grid";
import useDimensions from "react-cool-dimensions";
import classNames from "classnames";
import { ResizeObserver } from "@juggle/resize-observer";

import "./ui/AnimatedGrid.scss";

import getChildren from "./lib/getChildren";
import { getBreakPoints, getSizes } from "./lib/sizes";

const AnimatedGrid: FunctionComponent<AnimatedGridContainerProps> = props => {
    const { uiSizes, uiColumnWidth, uiGutterWidth, uiGutterHeight } = props;

    const { ref, currentBreakpoint } = useDimensions<HTMLDivElement>({
        useBorderBoxSize: true,
        polyfill: ResizeObserver,
        breakpoints: getBreakPoints(uiSizes)
    });

    const sizes = getSizes({ uiColumnWidth, uiGutterWidth, uiGutterHeight }, uiSizes, currentBreakpoint);
    const [loading, setIsLoading] = useState(true);
    const [objects, setObjects] = useState<ObjectItem[]>([]);

    useEffect(() => {
        setIsLoading(props.dataSource.status === "loading");
        setObjects(props.dataSource.items || []);
    }, [props.dataSource]);

    const empty = objects.length === 0;
    const breakPointClass = currentBreakpoint ? `size-${currentBreakpoint}` : "";
    const className = classNames("animated-grid", props.class, breakPointClass, { loading, empty });

    const easing = easings[props.uiEasing];
    const uiTransitions = transitions[props.uiTransition];

    return (
        <div className={className} ref={ref}>
            {loading && empty && <div className={classNames("loading_indicator")}>Loading grid...</div>}
            {!loading && empty && <div className={classNames("loading_indicator")}>No items in grid...</div>}
            {!loading && !empty && (
                <StackGrid
                    columnWidth={sizes.columnWidth}
                    component={props.uiComponent}
                    itemComponent={props.uiItemComponent}
                    gutterWidth={sizes.gutterWidth}
                    gutterHeight={sizes.gutterHeight}
                    duration={props.uiDuration}
                    easing={easing}
                    appearDelay={props.uiAppearDelay}
                    appear={uiTransitions.appear}
                    appeared={uiTransitions.appeared}
                    enter={uiTransitions.enter}
                    entered={uiTransitions.entered}
                    leaved={uiTransitions.leaved}
                    monitorImagesLoaded={props.uiMonitorImagesLoaded}
                    vendorPrefix={props.uiVendorPrefix}
                    horizontal={props.uiHorizontal}
                    rtl={props.uiRTL}
                >
                    {getChildren(objects, props.elements, props.uiItemWrapDiv, props.uiItemWrapClass)}
                </StackGrid>
            )}
        </div>
    );
};

export default hot(AnimatedGrid);
