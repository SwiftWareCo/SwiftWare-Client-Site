declare module "lodash/debounce" {
    import type { DebouncedFunc } from "lodash";

    export default function debounce<T extends (...args: never[]) => unknown>(
        func: T,
        wait?: number,
        options?: {
            leading?: boolean;
            maxWait?: number;
            trailing?: boolean;
        },
    ): DebouncedFunc<T>;
}
