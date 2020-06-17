import { Component, ReactNode, createElement, ReactElement, cloneElement } from "react";
import { hot } from "react-hot-loader/root";
import { AnimatedGridContainerProps } from "../typings/AnimatedGridProps";
import { ObjectItem } from "mendix";
import StackGrid, { easings, transitions, Animations } from "react-stack-grid";
import classNames from "classnames";
import sizeMe from "react-sizeme";

import "./ui/AnimatedGrid.scss";

type ContainerState = {
    loading: boolean;
    objects: ObjectItem[];
};

class AnimatedGrid extends Component<AnimatedGridContainerProps & sizeMe.SizeMeProps, ContainerState> {
    grid: StackGrid | null = null;

    constructor(props: AnimatedGridContainerProps & sizeMe.SizeMeProps) {
        super(props);

        this.state = {
            loading: true,
            objects: []
        };
    }

    UNSAFE_componentWillReceiveProps(props: AnimatedGridContainerProps & sizeMe.SizeMeProps): void {
        const { dataSource } = props;

        if (dataSource && dataSource.status === "available" && dataSource.items) {
            this.setState({
                objects: dataSource.items as ObjectItem[],
                loading: false
            });
        }
    }

    render(): ReactNode {
        const { loading, objects } = this.state;
        const empty = objects.length === 0;
        const className = classNames("animated-grid", this.props.class, { loading, empty });

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

        const easing = this.getEasings();
        const transitions = this.getTransitons();

        return (
            <StackGrid
                columnWidth={this.getColumnWidth()}
                style={{ height: 100 }}
                className={className}
                gridRef={grid => {
                    this.grid = grid;
                    // TODO: Remove this or expose properly.
                    // Should make it possible to target the grid and trigger updateLayout from a Nanoflow

                    // @ts-ignore
                    window.__GRID = this.grid;
                }}
                component={this.props.uiComponent}
                itemComponent={this.props.uiItemComponent}
                gutterWidth={this.props.uiGutterWidth}
                gutterHeight={this.props.uiGutterHeight}
                duration={this.props.uiDuration}
                easing={easing}
                appearDelay={this.props.uiAppearDelay}
                appear={transitions.appear}
                appeared={transitions.appeared}
                enter={transitions.enter}
                entered={transitions.entered}
                leaved={transitions.leaved}
                monitorImagesLoaded={this.props.uiMonitorImagesLoaded}
                vendorPrefix={this.props.uiVendorPrefix}
                horizontal={this.props.uiHorizontal}
                rtl={this.props.uiRTL}
            >
                {this.getChildren()}
            </StackGrid>
        );
    }

    private getColumnWidth(): string | number {
        const uiColumnWidth = this.props.uiColumnWidth.trim();
        if (!uiColumnWidth) {
            return 150;
        }
        const parsed = parseInt(uiColumnWidth, 10);
        if (parsed.toString().length === uiColumnWidth.length && !isNaN(parsed)) {
            return parsed;
        }
        return uiColumnWidth;
    }

    private getEasings(): string {
        const { uiEasing } = this.props;
        return easings[uiEasing];
    }

    private getTransitons(): Animations {
        const { uiTransition } = this.props;
        return transitions[uiTransition];
    }

    private getChildren(): ReactElement[] {
        const { objects } = this.state;
        const { elements, uiItemWrapDiv, uiItemWrapClass } = this.props;
        return objects.map(item => {
            const rendered = elements(item) as ReactElement;
            const cloned = cloneElement(rendered, {
                key: `child-${item.id}`,
                ref: `child-${item.id}`
            });
            if (uiItemWrapDiv) {
                return <div className={classNames(uiItemWrapClass)}>{cloned}</div>;
            }
            return cloned;
        });
    }
}

export default hot(sizeMe()(AnimatedGrid));
