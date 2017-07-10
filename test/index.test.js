import { bound } from '../index.js';
import sinon from 'sinon';
import { expect } from 'chai';

describe('bound', function () {
    const someSpy = sinon.spy();
    let testInstance = null;

    class TestClass {
        doSomething() {
            setTimeout(function () {
                this._doSomethingInternally();
            }, 100);
        }

        @bound
        _doSomethingInternally() {
            someSpy();
        }
    }

    beforeEach(() => {
        someSpy.reset();
        testInstance = new TestClass();
    });

    it('should call internal method', done => {
        testInstance.doSomething();
        setTimeout(() => {
            expect(someSpy.calledOnce).to.be.true;
            done();
        }, 200);
    });
});