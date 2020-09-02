module.exports = {
    success: function(msg, data) {
        const result = {
            code: 200,
            status: 'success',
        };
        if (data) {
            result.data = data;
        }
        if (msg) {
            result.msg = msg;
        }
        return result;
    },
    error: function(msg) {
        const result = {
            code: 500,
            status: 'error',
        };
        if (msg) {
            result.msg = msg;
        }
        return result;
    },
    fail: function(msg) {
        const result = {
            code: 400,
            status: 'fail',
        };
        if (msg) {
            result.msg = msg;
        }
        return result;
    }
}