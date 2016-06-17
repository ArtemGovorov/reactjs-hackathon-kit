require('./spec-helper');
requireAll((<any>require).context('./', true, /spec.ts(x)?$/));
function requireAll(r: any): any {
    r.keys().forEach(r);
}