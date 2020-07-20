import { UiSizesType } from "../../typings/AnimatedGridProps";

interface SizesObject {
    columnWidth: string | number;
    gutterWidth: number;
    gutterHeight: number;
}

interface SizesDefaults {
    uiColumnWidth: string;
    uiGutterWidth: number;
    uiGutterHeight: number;
}

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

export const getSizes = (defaultSizes: SizesDefaults, sizes: UiSizesType[], breakPoint: string): SizesObject => {
    const defaultSize = {
        columnWidth: getColumnWidth(defaultSizes.uiColumnWidth),
        gutterWidth: defaultSizes.uiGutterWidth,
        gutterHeight: defaultSizes.uiGutterHeight
    };

    if (!breakPoint || sizes.length === 0) {
        return defaultSize;
    }

    const findUISize = sizes.find(s => s.sizeBreakPointID === breakPoint);
    if (findUISize) {
        return {
            columnWidth: getColumnWidth(findUISize.sizeColumnWidth),
            gutterWidth: findUISize.sizeGutterWidth,
            gutterHeight: findUISize.sizeGutterHeight
        };
    }
    return defaultSize;
};

export const getBreakPoints = (sizes: UiSizesType[]): { [key: string]: number } => {
    return sizes.reduce<{ [key: string]: number }>((acc, cur) => {
        acc[cur.sizeBreakPointID] = cur.sizeBreakPoint;
        return acc;
    }, {});
};
