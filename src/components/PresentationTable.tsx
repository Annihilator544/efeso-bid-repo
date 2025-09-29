interface TableProps {
    headers: string[];
    rows: string[][];
    className?: string;
}

export function PresentationTable({
    headers,
    rows,
    className = '',
}: TableProps) {
    return (
        <div
            className={`w-full overflow-hidden rounded-lg border border-gray-200 ${className}`}
        >
            <table className='w-full'>
                <thead>
                    <tr className='bg-table-header'>
                        {headers.map((header, index) => (
                            <th
                                key={index}
                                className='px-6 py-4 text-left text-sm font-semibold text-white'
                            >
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, rowIndex) => (
                        <tr
                            key={rowIndex}
                            className={
                                rowIndex % 2 === 0
                                    ? 'bg-table-row-even'
                                    : 'bg-table-row-odd'
                            }
                        >
                            {row.map((cell, cellIndex) => (
                                <td
                                    key={cellIndex}
                                    className='px-6 py-4 text-sm text-gray-700 border-t border-gray-100 '
                                >
                                    {cell}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
