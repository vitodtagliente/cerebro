import * as path from 'path';

class V8StackElements
{
    customStack;
    get stack()
    {
        return this.customStack;
    }

    constructor(callerIndex)
    {

        // Use V8's feature to get a structured stack trace
        const oldStackTrace = Error.prepareStackTrace;
        const oldLimit = Error.stackTraceLimit;
        try
        {
            Error.stackTraceLimit = callerIndex + 1; // <- we only want the top couple of elements
            Error.prepareStackTrace = (err, structuredStackTrace) => structuredStackTrace;
            Error.captureStackTrace(this);
            this.customStack = this.stack; // <- invoke the getter for 'stack'
        } finally
        {
            Error.stackTraceLimit = oldLimit;
            Error.prepareStackTrace = oldStackTrace;
        }
    }
}

export default class StackElements
{
    static getFormatedStackTraceElement(callerIndex)
    {
        callerIndex = callerIndex + 2; //ignor v8 level and this level
        const stack = new V8StackElements(callerIndex).stack;
        const element = stack[callerIndex];
        const filename = path.basename(element.getFileName());
        const caller = element.getFunctionName();
        const line = element.getLineNumber();
        return filename + ((caller) ? `(${caller}:${line})` : `:${line}`);
    }
}