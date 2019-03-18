declare module 'download-git-repo' {
    function download(repo: string, dest: string, opts: object, fn: any): null;
    // default function ty hack https://github.com/Microsoft/TypeScript/issues/5073
    namespace download {}
    export = download;
};
