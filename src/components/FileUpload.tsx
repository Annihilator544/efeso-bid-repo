import React, { useRef } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from './ui/card';
import { Upload, FileSpreadsheet, FileText } from 'lucide-react';
import { useToast } from './ui/use-toast';
import Papa, { ParseResult } from 'papaparse';
import * as XLSX from 'xlsx';

interface FileUploadProps {
    onFileProcessed: (data: any) => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onFileProcessed }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { toast } = useToast();

    const handleFileSelect = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const fileExtension = file.name.split('.').pop()?.toLowerCase();

        if (!['xlsx', 'xls', 'csv'].includes(fileExtension || '')) {
            toast({
                title: 'Invalid file type',
                description:
                    'Please upload an Excel (.xlsx, .xls) or CSV file.',
                variant: 'destructive',
            });
            return;
        }

        try {
            let parsedData;

            if (fileExtension === 'csv') {
                parsedData = await parseCSV(file);
            } else {
                parsedData = await parseExcel(file);
            }

            onFileProcessed(parsedData);
            toast({
                title: 'File uploaded successfully',
                description: `Processed ${parsedData.length} rows of data.`,
            });
        } catch (error) {
            console.error('Error processing file:', error);
            toast({
                title: 'Error processing file',
                description: 'Please check the file format and try again.',
                variant: 'destructive',
            });
        }

        // Reset file input
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const parseCSV = (file: File): Promise<Record<string, string>[]> => {
        return new Promise((resolve, reject) => {
            Papa.parse<Record<string, string>>(file, {
                header: true,
                skipEmptyLines: true,
                complete: (results: ParseResult<Record<string, string>>) => {
                    if (results.errors.length) {
                        reject(results.errors);
                    } else {
                        resolve(results.data);
                    }
                },
                error: (error) => reject(error),
            });
        });
    };

    const parseExcel = (file: File): Promise<Record<string, any>[]> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = (e) => {
                try {
                    const data = e.target?.result;
                    if (!data) {
                        reject(new Error('File could not be read'));
                        return;
                    }

                    const workbook = XLSX.read(data, { type: 'array' });
                    const sheetName = workbook.SheetNames[0];
                    const worksheet = workbook.Sheets[sheetName];
                    const jsonData = XLSX.utils.sheet_to_json<
                        Record<string, any>
                    >(worksheet, {
                        defval: '', // fill empty cells with ""
                        raw: false,
                    });

                    resolve(jsonData);
                } catch (error) {
                    reject(error);
                }
            };

            reader.onerror = () => reject(new Error('Error reading file'));
            reader.readAsArrayBuffer(file); // ✅ safer than binary string
        });
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                    <Upload className='h-5 w-5' />
                    Upload Data File
                </CardTitle>
                <CardDescription>
                    Upload an Excel or CSV file with your company data. The file
                    should contain questions and answers or structured data.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className='space-y-4'>
                    <Button
                        onClick={handleFileSelect}
                        variant='outline'
                        className='w-full h-20 border-dashed border-2 hover:border-primary/50'
                    >
                        <div className='flex flex-col items-center gap-2'>
                            <div className='flex gap-2'>
                                <FileSpreadsheet className='h-6 w-6' />
                                <FileText className='h-6 w-6' />
                            </div>
                            <span>Click to upload Excel or CSV file</span>
                            <span className='text-sm text-muted-foreground'>
                                Supported formats: .xlsx, .xls, .csv
                            </span>
                        </div>
                    </Button>

                    <Input
                        ref={fileInputRef}
                        type='file'
                        accept='.xlsx,.xls,.csv'
                        onChange={handleFileChange}
                        className='hidden'
                    />

                    <div className='text-sm text-muted-foreground'>
                        <p className='font-medium mb-2'>
                            Expected file format:
                        </p>
                        <ul className='list-disc list-inside space-y-1'>
                            <li>Column A: Question ID (Q001, Q002, etc.)</li>
                            <li>Column B: Question</li>
                            <li>Column C: Answer</li>
                        </ul>
                        <p className='mt-2'>
                            For array data (leadership, products, etc.),
                            separate multiple values with "|" in the answer
                            column.
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
