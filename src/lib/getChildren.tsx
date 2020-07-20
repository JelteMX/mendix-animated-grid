import { ReactNode, cloneElement, ReactElement, createElement } from "react";
import { ObjectItem } from "mendix";
import classNames from "classnames";

const getChildren = (
    objects: ObjectItem[],
    render: (item: ObjectItem) => ReactNode,
    wrap: boolean,
    wrapClass = ""
): JSX.Element[] => {
    return objects.map(obj => {
        const rendered = render(obj) as ReactElement;
        const cloned = cloneElement(rendered, {
            key: `child-${obj.id}`
        });
        if (wrap) {
            return <div className={classNames(wrapClass)}>{cloned}</div>;
        }
        return cloned;
    });
};

export default getChildren;
