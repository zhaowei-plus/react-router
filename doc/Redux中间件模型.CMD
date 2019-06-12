redux中间件： 三级柯里化函数

redux-promise：
export default function promiseMiddleware({ dispatch }) {
    return next => action => {
       next(action);
    };
}

const doNothingMidddleware = (dispatch, getState) => next => action => next(action);

展开:
function doNothingMidddleware((dispatch, getState)) {
    return function(next) {
        return function(action) {
            next(action);
        }
    }
}

