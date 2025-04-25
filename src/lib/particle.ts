const MIN_RADIUS = 7.5;
const MAX_RADIUS = 15;
const DEPTH = 2;
const LEFT_COLOR = "46b3ff";
const RIGHT_COLOR = "80e5ff";
const NUM_POINTS = 2500;

/**
 * --- Credit ---
 * https://stackoverflow.com/questions/16360533/calculate-color-hex-having-2-colors-and-percent-position
 */
const getGradientStop = (ratio: number) => {
    // For outer ring numbers potentially past max radius,
    // just clamp to 0
    ratio = ratio > 1 ? 1 : ratio < 0 ? 0 : ratio;

    const c0 = LEFT_COLOR.match(/.{1,2}/g)!.map(
    (oct) => parseInt(oct, 16) * (1 - ratio)
    );
    const c1 = RIGHT_COLOR.match(/.{1,2}/g)!.map(
    (oct) => parseInt(oct, 16) * ratio
    );
    const ci = [0, 1, 2].map((i) => Math.min(Math.round(c0[i] + c1[i]), 255));
    const color = ci
    .reduce((a, v) => (a << 8) + v, 0)
    .toString(16)
    .padStart(6, "0");

    return `#${color}`;
};

// 增强颜色随机性的函数
const enhanceColor = (color: string): string => {
    // 有30%的概率返回一个随机的蓝绿黄色系颜色，而不是渐变色
    if (Math.random() < 0.3) {
        const randomColors = [
            "#4d94ff", // 柔和蓝色
            "#66ccff", // 淡蓝色
            "#3399ff", // 中等蓝色
            "#70db70", // 柔和绿色
            "#5cd65c", // 中等绿色
            "#33cc33", // 稍亮绿色
            "#e6e600", // 柔和黄色
            "#cccc00", // 中等黄色
            "#b3ffb3", // 淡绿色
            "#99ffff", // 淡青色
            "#80bfff", // 淡蓝色
        ];
        return randomColors[Math.floor(Math.random() * randomColors.length)];
    }
    return color;
};

const calculateColor = (x: number) => {
    const maxDiff = MAX_RADIUS * 2;
    const distance = x + MAX_RADIUS;

    const ratio = distance / maxDiff;

    const stop = getGradientStop(ratio);
    // 使用增强函数增加颜色的多样性
    return enhanceColor(stop);
};

const randomFromInterval = (min: number, max: number) => {
    return Math.random() * (max - min) + min;
};

export const pointsInner = Array.from(
    { length: NUM_POINTS },
    (v, k) => k + 1
).map((num) => {
    const randomRadius = randomFromInterval(MIN_RADIUS, MAX_RADIUS);
    const randomAngle = Math.random() * Math.PI * 2;

    const x = Math.cos(randomAngle) * randomRadius;
    const y = Math.sin(randomAngle) * randomRadius;
    const z = randomFromInterval(-DEPTH, DEPTH);

    const color = calculateColor(x);

    return {
    idx: num,
    position: [x, y, z],
    color,
    };
});

export const pointsOuter = Array.from(
    { length: NUM_POINTS / 4 },
    (v, k) => k + 1
).map((num) => {
    const randomRadius = randomFromInterval(MIN_RADIUS / 2, MAX_RADIUS * 2);
    const angle = Math.random() * Math.PI * 2;

    const x = Math.cos(angle) * randomRadius;
    const y = Math.sin(angle) * randomRadius;
    const z = randomFromInterval(-DEPTH * 10, DEPTH * 10);

    const color = calculateColor(x);

    return {
    idx: num,
    position: [x, y, z],
    color,
    };
});