export const toStringParams = (params: Record<string, any>) => {
    return Object.fromEntries(
        Object.entries(params).map(([key, value]) => [key, String(value)])
    );
};
