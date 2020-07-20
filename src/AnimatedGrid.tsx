import { FunctionComponent, createElement, ReactElement, cloneElement, useState, useEffect } from "react";
import { hot } from "react-hot-loader/root";
import { AnimatedGridContainerProps } from "../typings/AnimatedGridProps";
import { ObjectItem } from "mendix";
import StackGrid, { easings, transitions } from "react-stack-grid";
import classNames from "classnames";
import sizeMe from "react-sizeme";

import "./ui/AnimatedGrid.scss";

const getColumnWidth = (strWidth: string): string | number => {
    const uiColumnWidth = strWidth.trim();
    if (!uiColumnWidth) {
        return 150;
    }
    const parsed = parseInt(uiColumnWidth, 10);
    if (parsed.toString().length === uiColumnWidth.length && !isNaN(parsed)) {
        return parsed;
    }
    return uiColumnWidth;
};

const AnimatedGrid: FunctionComponent<AnimatedGridContainerProps & sizeMe.SizeMeProps> = props => {
    const [loading, setLoading] = useState(true);
    const [objects, setObjects] = useState<ObjectItem[]>([]);

    useEffect(() => {
        if (props.dataSource && props.dataSource.status === "available" && props.dataSource.items) {
            setLoading(false);
            setObjects(props.dataSource.items);
        }
    }, [props.dataSource]);

    const empty = objects.length === 0;
    const className = classNames("animated-grid", props.class, { loading, empty });

    if (loading && empty) {
        return (
            <div className={className}>
                <div className={classNames("loading_indicator")}>Loading grid...</div>
            </div>
        );
    }

    if (empty) {
        return (
            <div className={className}>
                <div className={classNames("loading_indicator")}>No items in grid...</div>
            </div>
        );
    }

    const easing = easings[props.uiEasing];
    const uiTransitions = transitions[props.uiTransition];

    const children = objects.map(obj => {
        const rendered = props.elements(obj) as ReactElement;
        const cloned = cloneElement(rendered, {
            key: `child-${obj.id}`
        });
        if (props.uiItemWrapDiv) {
            return <div className={classNames(props.uiItemWrapClass)}>{cloned}</div>;
        }
        return cloned;
    });

    return (
        <StackGrid
            columnWidth={getColumnWidth(props.uiColumnWidth)}
            className={className}
            component={props.uiComponent}
            itemComponent={props.uiItemComponent}
            gutterWidth={props.uiGutterWidth}
            gutterHeight={props.uiGutterHeight}
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
            {children}
        </StackGrid>
    );
};

export default hot(sizeMe()(AnimatedGrid));
