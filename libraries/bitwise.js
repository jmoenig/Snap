SnapExtensions.primitives.set(
    'bit_and(a, b)',
    function (a, b) {
        return a & b;
    }
);

SnapExtensions.primitives.set(
    'bit_or(a, b)',
    function (a, b) {
        return a | b;
    }
);

SnapExtensions.primitives.set(
    'bit_xor(a, b)',
    function (a, b) {
        return a ^ b;
    }
);

SnapExtensions.primitives.set(
    'bit_not(a)',
    function (a) {
        return ~ a;
    }
);

SnapExtensions.primitives.set(
    'bit_left_shift(a, b)',
    function (a, b) {
        return a << b;
    }
);

SnapExtensions.primitives.set(
    'bit_right_shift(a, b)',
    function (a, b) {
        return a >> b;
    }
);

SnapExtensions.primitives.set(
    'bit_unsigned_right_shift(a, b)',
    function (a, b) {
        return a >>> b;
    }
);
