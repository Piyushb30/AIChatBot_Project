export default function LoadingComponent() {
    return (
        <div className="flex flex-col items-center justify-center space-y-4">
            <div className="relative w-12 h-12">
                <div className="absolute inset-0 border-4 border-neutral-100 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-brand border-t-transparent rounded-full animate-spin"></div>
            </div>
            <p className="text-xs font-medium text-neutral-400 animate-pulse tracking-widest uppercase">Thinking...</p>
        </div>
    )
}
