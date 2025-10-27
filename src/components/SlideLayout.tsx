import { ReactNode } from 'react';

interface SlideLayoutProps {
    title?: string;
    children: ReactNode;
    slideNumber?: number;
    totalSlides?: number;
    isTitle?: boolean;
    className?: string;
}

export function SlideLayout({
    title,
    children,
    slideNumber,
    totalSlides,
    isTitle = false,
    className = '',
}: SlideLayoutProps) {
    return (
        <div
            className={`relative w-full h-fit min-h-[600px] pb-8 bg-white border border-gray-200 shadow-lg ${className}`}
        >
            {/* Header with title */}
            {title && !isTitle && (
                <div className='p-8 pb-6'>
                    <h1 className='text-2xl font-semibold text-presentation-header'>
                        {title}
                    </h1>
                </div>
            )}

            {/* Main content area */}
            <div
                className={`${title && !isTitle ? 'px-8 pb-8' : 'p-8'} ${isTitle ? 'flex flex-col items-center justify-center h-full' : ''}`}
            >
                {children}
            </div>

            {/* Footer with branding and page number */}
            {!isTitle && (
                <div className='absolute bottom-0 left-0 right-0 flex justify-between items-center p-6 text-xs text-gray-500'>
                    <div className='flex items-center gap-2'>
                        <div className='w-6 h-2 bg-efeso-orange'></div>
                        <span className='font-medium text-gray-600'>
                            EFESO UK BID
                        </span>
                    </div>

                    <div className='flex items-center gap-8'>
                        <div className='text-right'>
                            <div className='font-semibold text-gray-700'>
                                Company Name
                            </div>
                        </div>

                        {slideNumber && totalSlides && (
                            <div className='text-gray-600'>
                                © EFESO | {slideNumber}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Page counter for title slide */}
            {isTitle && slideNumber && totalSlides && (
                <div className='absolute top-4 right-4 bg-gray-600 text-white px-3 py-1 rounded text-xs'>
                    Page {slideNumber} of {totalSlides}
                </div>
            )}
        </div>
    );
}
