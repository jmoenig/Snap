function QuotientNaNException(numerator, denominator) {
    this.name = "Quotient exception";
    this.message = "illegal division operation: (" + numerator + ") / (" + denominator + ")";
}

Process.prototype.reportQuotient = function (a, b) {
    var result = +a / +b;
    if (isNaN(result)) {
        throw new QuotientNaNException(+a, +b);
    }
    return result;
};


function ModulusNaNException(numerator, denominator) {
    this.name = "Modulus exception";
    this.message = "illegal modulus operation: (" + numerator + ") / (" + denominator + ")";
}

Process.prototype.reportModulus = function (a, b) {
    var x = +a,
        y = +b;
    var result = ((x % y) + y) % y;
    if (isNaN(result)) {
        throw new ModulusNaNException(+a, +b);
    }
    return result;
};


function MonadicNaNException(func, number) {
    this.name = "\"" + func + "\" exception";
    this.message = "illegal " + func + " operation: " + func + "(" + number + ")";
}

Process.prototype.uberReportMonadic = Process.prototype.reportMonadic;
Process.prototype.reportMonadic = function (fname, n) {
    var result = this.uberReportMonadic(fname, n);
    if (isNaN(result)) {
        throw new MonadicNaNException(fname, n);
    }
    return result;
};