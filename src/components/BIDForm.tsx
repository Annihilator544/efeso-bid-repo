import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Trash2 } from 'lucide-react';
import { CompanyData } from '@/types/bid';
import { buttonVariants } from '@/components/ui/button-variants';
import { FileUpload } from '@/components/FileUpload';
import { parseUploadedData, generateTemplateData } from '@/lib/dataParser';
import { useToast } from '@/components/ui/use-toast';
import useCompanyStore from '@/store/use-company-data';
import { Link, useNavigate } from 'react-router-dom';
import useLoadingStore from '@/store/use-loading-data';
import fetchAllData from '@/lib/request';

export function BIDForm() {
    const { toast } = useToast();
    const { companyData, setCompanyData, reset } = useCompanyStore();
    const { setLoading } = useLoadingStore();
    const [data, setData] = useState<CompanyData>(companyData);
    const [shouldResetData, setShouldResetData] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (shouldResetData) {
            setData(companyData);
            setShouldResetData(false);
        }
    }, [companyData, shouldResetData]);

    const handleFileProcessed = (rows: any[]) => {
        try {
            const parsedData = parseUploadedData(rows);
            const mergedData = { ...data, ...parsedData };
            setData(mergedData);
            toast({
                title: 'Data imported successfully',
                description: `Imported data for ${Object.keys(parsedData).length} sections.`,
            });
        } catch (error) {
            console.error('Error merging data:', error);
            toast({
                title: 'Error importing data',
                description: 'There was an issue processing the uploaded data.',
                variant: 'destructive',
            });
        }
    };

    const downloadTemplate = () => {
        const templateData = generateTemplateData();
        const csvContent =
            'data:text/csv;charset=utf-8,' +
            'Question ID,Question,Answer\n' +
            templateData
                .map(
                    (row) =>
                        `${row.questionId},"${row.question}","${row.answer}"`
                )
                .join('\n');

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', 'BID_Template.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    useEffect(() => {
        const timeout = setTimeout(() => {
            setCompanyData(data);
        }, 300);

        return () => clearTimeout(timeout);
    }, [data]);

    const updateData = (path: string, value: any) => {
        const keys = path.split('.');
        const newData = JSON.parse(JSON.stringify(data));
        let current = newData;
        for (let i = 0; i < keys.length - 1; i++) {
            current = current[keys[i]];
        }
        current[keys[keys.length - 1]] = value;

        setData(newData);
    };

    const addArrayItem = (path: string, item: any) => {
        const keys = path.split('.');
        const newData = JSON.parse(JSON.stringify(data));

        let current = newData;
        for (const key of keys) {
            current = current[key];
        }
        current.push(item);

        setData(newData);
    };

    const removeArrayItem = (path: string, index: number) => {
        const keys = path.split('.');
        const newData = JSON.parse(JSON.stringify(data));

        let current = newData;
        for (const key of keys) {
            current = current[key];
        }
        current.splice(index, 1);

        setData(newData);
    };

    return (
        <div className='w-full max-w-4xl mx-auto space-y-6'>
            <Card>
                <CardHeader>
                    <CardTitle className='flex items-center gap-3'>
                        <div className='w-6 h-3 bg-efeso-orange rounded'></div>
                        EFESO Business Intelligence Deck Builder
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue='upload' className='w-full'>
                        {/* <TabsList className='grid w-full grid-cols-8 text-xs'>
                            <TabsTrigger value='upload'>Upload</TabsTrigger>
                            <TabsTrigger value='basic'>Basic</TabsTrigger>
                            <TabsTrigger value='structure'>
                                Structure
                            </TabsTrigger>
                            <TabsTrigger value='operations'>
                                Operations
                            </TabsTrigger>
                            <TabsTrigger value='competitors'>
                                Competitors
                            </TabsTrigger>
                            <TabsTrigger value='financials'>
                                Financials
                            </TabsTrigger>
                            <TabsTrigger value='improvements'>
                                Improvements
                            </TabsTrigger>
                            <TabsTrigger value='analysis'>Analysis</TabsTrigger>
                        </TabsList> */}

                        <TabsContent value='upload' className='space-y-6 mt-6'>
                            <div className='grid gap-6'>
                                {/* <FileUpload
                                    onFileProcessed={handleFileProcessed}
                                /> */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Company Name</CardTitle>
                                        <CardDescription>
                                            {' '}
                                            Get Started by just giving the
                                            company name
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <Input
                                            value={data.companyName}
                                            onChange={(e) =>
                                                updateData(
                                                    'companyName',
                                                    e.target.value
                                                )
                                            }
                                            placeholder='Enter company name'
                                        />
                                    </CardContent>
                                    <CardFooter className='flex justify-end'>
                                        <Button
                                            variant='outline'
                                            onClick={async () => {
                                                setLoading(true);
                                                const result =
                                                    await fetchAllData(
                                                        data.companyName
                                                    );
                                                setData((prev) => ({
                                                    ...prev,
                                                    ...result,
                                                }));
                                                setLoading(false);
                                            }}
                                        >
                                            Generate Data
                                        </Button>
                                    </CardFooter>
                                </Card>
                                {/* <Card>
                                    <CardHeader>
                                        <CardTitle>Download Template</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <Button
                                            onClick={downloadTemplate}
                                            variant='outline'
                                            className='w-full'
                                        >
                                            Download CSV Template
                                        </Button>
                                        <p className='text-sm text-muted-foreground mt-2'>
                                            Download a template with all
                                            questions to fill out your data
                                            offline
                                        </p>
                                    </CardContent>
                                </Card> */}
                            </div>
                        </TabsContent>

                        <TabsContent value='basic' className='space-y-6 mt-6'>
                            <div className='grid grid-cols-2 gap-4'>
                                <div>
                                    <Label htmlFor='companyName'>
                                        Company Name
                                    </Label>
                                    <Input
                                        id='companyName'
                                        value={data.companyName}
                                        onChange={(e) =>
                                            updateData(
                                                'companyName',
                                                e.target.value
                                            )
                                        }
                                    />
                                </div>
                                <div>
                                    <Label htmlFor='date'>Date</Label>
                                    <Input
                                        id='date'
                                        value={data.date}
                                        onChange={(e) =>
                                            updateData('date', e.target.value)
                                        }
                                    />
                                </div>
                            </div>

                            <div>
                                <Label htmlFor='description'>
                                    Company Description
                                </Label>
                                <Textarea
                                    id='description'
                                    value={data.overview.description}
                                    onChange={(e) =>
                                        updateData(
                                            'overview.description',
                                            e.target.value
                                        )
                                    }
                                    rows={3}
                                />
                            </div>

                            <div className='grid grid-cols-2 gap-4'>
                                <div>
                                    <Label htmlFor='founded'>Founded</Label>
                                    <Input
                                        id='founded'
                                        value={data.overview.founded}
                                        onChange={(e) =>
                                            updateData(
                                                'overview.founded',
                                                e.target.value
                                            )
                                        }
                                    />
                                </div>
                                <div>
                                    <Label htmlFor='employees'>Employees</Label>
                                    <Input
                                        id='employees'
                                        value={data.overview.employees}
                                        onChange={(e) =>
                                            updateData(
                                                'overview.employees',
                                                e.target.value
                                            )
                                        }
                                    />
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent
                            value='structure'
                            className='space-y-6 mt-6'
                        >
                            <div>
                                <Label>Leadership Team</Label>
                                <div className='space-y-4 mt-2'>
                                    {data.leadership.map((leader, index) => (
                                        <div
                                            key={index}
                                            className='border rounded-lg p-4 space-y-3'
                                        >
                                            <div className='grid grid-cols-3 gap-3'>
                                                <Input
                                                    placeholder='Name'
                                                    value={leader.name}
                                                    onChange={(e) =>
                                                        updateData(
                                                            `leadership.${index}.name`,
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                                <Input
                                                    placeholder='Title'
                                                    value={leader.title}
                                                    onChange={(e) =>
                                                        updateData(
                                                            `leadership.${index}.title`,
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                                <div className='flex gap-2'>
                                                    <Input
                                                        placeholder='Background'
                                                        value={
                                                            leader.background
                                                        }
                                                        onChange={(e) =>
                                                            updateData(
                                                                `leadership.${index}.background`,
                                                                e.target.value
                                                            )
                                                        }
                                                        className='flex-1'
                                                    />
                                                    <Button
                                                        variant='outline'
                                                        size='sm'
                                                        onClick={() =>
                                                            removeArrayItem(
                                                                'leadership',
                                                                index
                                                            )
                                                        }
                                                    >
                                                        <Trash2 className='h-4 w-4' />
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    <Button
                                        variant='outline'
                                        onClick={() =>
                                            addArrayItem('leadership', {
                                                name: '',
                                                title: '',
                                                background: '',
                                            })
                                        }
                                    >
                                        <Plus className='h-4 w-4 mr-2' />
                                        Add Leader
                                    </Button>
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent
                            value='operations'
                            className='space-y-6 mt-6'
                        >
                            <div>
                                <Label>Products & Services</Label>
                                <div className='space-y-4 mt-2'>
                                    {data.products.map((product, index) => (
                                        <div
                                            key={index}
                                            className='border rounded-lg p-4 space-y-3'
                                        >
                                            <div className='grid grid-cols-2 gap-3'>
                                                <Input
                                                    placeholder='Category'
                                                    value={product.category}
                                                    onChange={(e) =>
                                                        updateData(
                                                            `products.${index}.category`,
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                                <div className='flex gap-2'>
                                                    <Input
                                                        placeholder='Items'
                                                        value={product.items}
                                                        onChange={(e) =>
                                                            updateData(
                                                                `products.${index}.items`,
                                                                e.target.value
                                                            )
                                                        }
                                                        className='flex-1'
                                                    />
                                                    <Button
                                                        variant='outline'
                                                        size='sm'
                                                        onClick={() =>
                                                            removeArrayItem(
                                                                'products',
                                                                index
                                                            )
                                                        }
                                                    >
                                                        <Trash2 className='h-4 w-4' />
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    <Button
                                        variant='outline'
                                        onClick={() =>
                                            addArrayItem('products', {
                                                category: '',
                                                items: '',
                                            })
                                        }
                                    >
                                        <Plus className='h-4 w-4 mr-2' />
                                        Add Product Category
                                    </Button>
                                </div>
                            </div>

                            <div>
                                <Label>Geographic Operations</Label>
                                <div className='space-y-4 mt-2'>
                                    {data.operations.map((operation, index) => (
                                        <div
                                            key={index}
                                            className='border rounded-lg p-4 space-y-3'
                                        >
                                            <div className='grid grid-cols-2 gap-3'>
                                                <Input
                                                    placeholder='Country'
                                                    value={operation.country}
                                                    onChange={(e) =>
                                                        updateData(
                                                            `operations.${index}.country`,
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                                <div className='flex gap-2'>
                                                    <Input
                                                        placeholder='Facilities'
                                                        value={
                                                            operation.facilities
                                                        }
                                                        onChange={(e) =>
                                                            updateData(
                                                                `operations.${index}.facilities`,
                                                                e.target.value
                                                            )
                                                        }
                                                        className='flex-1'
                                                    />
                                                    <Button
                                                        variant='outline'
                                                        size='sm'
                                                        onClick={() =>
                                                            removeArrayItem(
                                                                'operations',
                                                                index
                                                            )
                                                        }
                                                    >
                                                        <Trash2 className='h-4 w-4' />
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    <Button
                                        variant='outline'
                                        onClick={() =>
                                            addArrayItem('operations', {
                                                country: '',
                                                facilities: '',
                                            })
                                        }
                                    >
                                        <Plus className='h-4 w-4 mr-2' />
                                        Add Operation
                                    </Button>
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent
                            value='competitors'
                            className='space-y-6 mt-6'
                        >
                            <div>
                                <Label>Competitors</Label>
                                <div className='space-y-4 mt-2'>
                                    {data.competitors.map(
                                        (competitor, index) => (
                                            <div
                                                key={index}
                                                className='border rounded-lg p-4 space-y-3'
                                            >
                                                <div className='grid grid-cols-2 gap-3'>
                                                    <Input
                                                        placeholder='Company Name'
                                                        value={competitor.name}
                                                        onChange={(e) =>
                                                            updateData(
                                                                `competitors.${index}.name`,
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                    <div className='flex gap-2'>
                                                        <Input
                                                            placeholder='Focus Areas'
                                                            value={
                                                                competitor.focusAreas
                                                            }
                                                            onChange={(e) =>
                                                                updateData(
                                                                    `competitors.${index}.focusAreas`,
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            className='flex-1'
                                                        />
                                                        <Button
                                                            variant='outline'
                                                            size='sm'
                                                            onClick={() =>
                                                                removeArrayItem(
                                                                    'competitors',
                                                                    index
                                                                )
                                                            }
                                                        >
                                                            <Trash2 className='h-4 w-4' />
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    )}
                                    <Button
                                        variant='outline'
                                        onClick={() =>
                                            addArrayItem('competitors', {
                                                name: '',
                                                focusAreas: '',
                                            })
                                        }
                                    >
                                        <Plus className='h-4 w-4 mr-2' />
                                        Add Competitor
                                    </Button>
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent
                            value='financials'
                            className='space-y-6 mt-6'
                        >
                            <div>
                                <Label>
                                    Financial Performance (Multi-Year)
                                </Label>
                                <div className='space-y-4 mt-2'>
                                    {data.financials.map((financial, index) => (
                                        <div
                                            key={index}
                                            className='border rounded-lg p-4 space-y-3'
                                        >
                                            <div className='grid grid-cols-4 gap-3'>
                                                <Input
                                                    placeholder='Year'
                                                    value={financial.year}
                                                    onChange={(e) =>
                                                        updateData(
                                                            `financials.${index}.year`,
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                                <Input
                                                    placeholder='Revenue'
                                                    value={financial.revenue}
                                                    onChange={(e) =>
                                                        updateData(
                                                            `financials.${index}.revenue`,
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                                <Input
                                                    placeholder='Operating Profit'
                                                    value={
                                                        financial.operatingProfit
                                                    }
                                                    onChange={(e) =>
                                                        updateData(
                                                            `financials.${index}.operatingProfit`,
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                                <div className='flex gap-2'>
                                                    <Input
                                                        placeholder='Net Profit'
                                                        value={
                                                            financial.netProfit
                                                        }
                                                        onChange={(e) =>
                                                            updateData(
                                                                `financials.${index}.netProfit`,
                                                                e.target.value
                                                            )
                                                        }
                                                        className='flex-1'
                                                    />
                                                    <Button
                                                        variant='outline'
                                                        size='sm'
                                                        onClick={() =>
                                                            removeArrayItem(
                                                                'financials',
                                                                index
                                                            )
                                                        }
                                                    >
                                                        <Trash2 className='h-4 w-4' />
                                                    </Button>
                                                </div>
                                            </div>
                                            <div className='grid grid-cols-3 gap-3'>
                                                <Input
                                                    placeholder='Operating Margin'
                                                    value={
                                                        financial.operatingMargin
                                                    }
                                                    onChange={(e) =>
                                                        updateData(
                                                            `financials.${index}.operatingMargin`,
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                                <Input
                                                    placeholder='Free Cash Flow'
                                                    value={
                                                        financial.freeCashFlow
                                                    }
                                                    onChange={(e) =>
                                                        updateData(
                                                            `financials.${index}.freeCashFlow`,
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                                <Input
                                                    placeholder='Debt'
                                                    value={financial.debt}
                                                    onChange={(e) =>
                                                        updateData(
                                                            `financials.${index}.debt`,
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </div>
                                        </div>
                                    ))}
                                    <Button
                                        variant='outline'
                                        onClick={() =>
                                            addArrayItem('financials', {
                                                year: '',
                                                revenue: '',
                                                operatingProfit: '',
                                                netProfit: '',
                                                operatingMargin: '',
                                                freeCashFlow: '',
                                                debt: '',
                                            })
                                        }
                                    >
                                        <Plus className='h-4 w-4 mr-2' />
                                        Add Financial Year
                                    </Button>
                                </div>
                            </div>

                            <div>
                                <Label>Current Profitability Analysis</Label>
                                <div className='grid grid-cols-2 gap-4 mt-2'>
                                    <div>
                                        <Label htmlFor='annualRevenue'>
                                            Annual Revenue
                                        </Label>
                                        <Input
                                            id='annualRevenue'
                                            value={
                                                data.profitability.annualRevenue
                                            }
                                            onChange={(e) =>
                                                updateData(
                                                    'profitability.annualRevenue',
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor='operatingProfitCurrent'>
                                            Operating Profit
                                        </Label>
                                        <Input
                                            id='operatingProfitCurrent'
                                            value={
                                                data.profitability
                                                    .operatingProfit
                                            }
                                            onChange={(e) =>
                                                updateData(
                                                    'profitability.operatingProfit',
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor='netProfitCurrent'>
                                            Net Profit
                                        </Label>
                                        <Input
                                            id='netProfitCurrent'
                                            value={data.profitability.netProfit}
                                            onChange={(e) =>
                                                updateData(
                                                    'profitability.netProfit',
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor='operatingMarginCurrent'>
                                            Operating Margin
                                        </Label>
                                        <Input
                                            id='operatingMarginCurrent'
                                            value={
                                                data.profitability
                                                    .operatingMargin
                                            }
                                            onChange={(e) =>
                                                updateData(
                                                    'profitability.operatingMargin',
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor='netMargin'>
                                            Net Margin
                                        </Label>
                                        <Input
                                            id='netMargin'
                                            value={data.profitability.netMargin}
                                            onChange={(e) =>
                                                updateData(
                                                    'profitability.netMargin',
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent
                            value='improvements'
                            className='space-y-6 mt-6'
                        >
                            <div className='grid grid-cols-1 gap-8'>
                                <div>
                                    <Label>Cost Reduction Strategies</Label>
                                    <div className='space-y-2 mt-2'>
                                        {data.improvements.costReduction.map(
                                            (item, index) => (
                                                <div
                                                    key={index}
                                                    className='flex gap-2'
                                                >
                                                    <Textarea
                                                        value={item}
                                                        onChange={(e) => {
                                                            const newItems = [
                                                                ...data
                                                                    .improvements
                                                                    .costReduction,
                                                            ];
                                                            newItems[index] =
                                                                e.target.value;
                                                            updateData(
                                                                'improvements.costReduction',
                                                                newItems
                                                            );
                                                        }}
                                                        rows={2}
                                                        className='flex-1'
                                                    />
                                                    <Button
                                                        variant='outline'
                                                        size='sm'
                                                        onClick={() => {
                                                            const newItems =
                                                                data.improvements.costReduction.filter(
                                                                    (_, i) =>
                                                                        i !==
                                                                        index
                                                                );
                                                            updateData(
                                                                'improvements.costReduction',
                                                                newItems
                                                            );
                                                        }}
                                                    >
                                                        <Trash2 className='h-4 w-4' />
                                                    </Button>
                                                </div>
                                            )
                                        )}
                                        <Button
                                            variant='outline'
                                            size='sm'
                                            onClick={() => {
                                                const newItems = [
                                                    ...data.improvements
                                                        .costReduction,
                                                    '',
                                                ];
                                                updateData(
                                                    'improvements.costReduction',
                                                    newItems
                                                );
                                            }}
                                        >
                                            <Plus className='h-4 w-4 mr-2' />
                                            Add Cost Strategy
                                        </Button>
                                    </div>
                                </div>

                                <div>
                                    <Label>Portfolio Optimization</Label>
                                    <div className='space-y-2 mt-2'>
                                        {data.improvements.portfolioOptimization.map(
                                            (item, index) => (
                                                <div
                                                    key={index}
                                                    className='flex gap-2'
                                                >
                                                    <Textarea
                                                        value={item}
                                                        onChange={(e) => {
                                                            const newItems = [
                                                                ...data
                                                                    .improvements
                                                                    .portfolioOptimization,
                                                            ];
                                                            newItems[index] =
                                                                e.target.value;
                                                            updateData(
                                                                'improvements.portfolioOptimization',
                                                                newItems
                                                            );
                                                        }}
                                                        rows={2}
                                                        className='flex-1'
                                                    />
                                                    <Button
                                                        variant='outline'
                                                        size='sm'
                                                        onClick={() => {
                                                            const newItems =
                                                                data.improvements.portfolioOptimization.filter(
                                                                    (_, i) =>
                                                                        i !==
                                                                        index
                                                                );
                                                            updateData(
                                                                'improvements.portfolioOptimization',
                                                                newItems
                                                            );
                                                        }}
                                                    >
                                                        <Trash2 className='h-4 w-4' />
                                                    </Button>
                                                </div>
                                            )
                                        )}
                                        <Button
                                            variant='outline'
                                            size='sm'
                                            onClick={() => {
                                                const newItems = [
                                                    ...data.improvements
                                                        .portfolioOptimization,
                                                    '',
                                                ];
                                                updateData(
                                                    'improvements.portfolioOptimization',
                                                    newItems
                                                );
                                            }}
                                        >
                                            <Plus className='h-4 w-4 mr-2' />
                                            Add Portfolio Strategy
                                        </Button>
                                    </div>
                                </div>

                                <div>
                                    <Label>Pricing & Revenue Management</Label>
                                    <div className='space-y-2 mt-2'>
                                        {data.improvements.pricingRevenue.map(
                                            (item, index) => (
                                                <div
                                                    key={index}
                                                    className='flex gap-2'
                                                >
                                                    <Textarea
                                                        value={item}
                                                        onChange={(e) => {
                                                            const newItems = [
                                                                ...data
                                                                    .improvements
                                                                    .pricingRevenue,
                                                            ];
                                                            newItems[index] =
                                                                e.target.value;
                                                            updateData(
                                                                'improvements.pricingRevenue',
                                                                newItems
                                                            );
                                                        }}
                                                        rows={2}
                                                        className='flex-1'
                                                    />
                                                    <Button
                                                        variant='outline'
                                                        size='sm'
                                                        onClick={() => {
                                                            const newItems =
                                                                data.improvements.pricingRevenue.filter(
                                                                    (_, i) =>
                                                                        i !==
                                                                        index
                                                                );
                                                            updateData(
                                                                'improvements.pricingRevenue',
                                                                newItems
                                                            );
                                                        }}
                                                    >
                                                        <Trash2 className='h-4 w-4' />
                                                    </Button>
                                                </div>
                                            )
                                        )}
                                        <Button
                                            variant='outline'
                                            size='sm'
                                            onClick={() => {
                                                const newItems = [
                                                    ...data.improvements
                                                        .pricingRevenue,
                                                    '',
                                                ];
                                                updateData(
                                                    'improvements.pricingRevenue',
                                                    newItems
                                                );
                                            }}
                                        >
                                            <Plus className='h-4 w-4 mr-2' />
                                            Add Pricing Strategy
                                        </Button>
                                    </div>
                                </div>

                                <div>
                                    <Label>Innovation & Brand Investment</Label>
                                    <div className='space-y-2 mt-2'>
                                        {data.improvements.innovation.map(
                                            (item, index) => (
                                                <div
                                                    key={index}
                                                    className='flex gap-2'
                                                >
                                                    <Textarea
                                                        value={item}
                                                        onChange={(e) => {
                                                            const newItems = [
                                                                ...data
                                                                    .improvements
                                                                    .innovation,
                                                            ];
                                                            newItems[index] =
                                                                e.target.value;
                                                            updateData(
                                                                'improvements.innovation',
                                                                newItems
                                                            );
                                                        }}
                                                        rows={2}
                                                        className='flex-1'
                                                    />
                                                    <Button
                                                        variant='outline'
                                                        size='sm'
                                                        onClick={() => {
                                                            const newItems =
                                                                data.improvements.innovation.filter(
                                                                    (_, i) =>
                                                                        i !==
                                                                        index
                                                                );
                                                            updateData(
                                                                'improvements.innovation',
                                                                newItems
                                                            );
                                                        }}
                                                    >
                                                        <Trash2 className='h-4 w-4' />
                                                    </Button>
                                                </div>
                                            )
                                        )}
                                        <Button
                                            variant='outline'
                                            size='sm'
                                            onClick={() => {
                                                const newItems = [
                                                    ...data.improvements
                                                        .innovation,
                                                    '',
                                                ];
                                                updateData(
                                                    'improvements.innovation',
                                                    newItems
                                                );
                                            }}
                                        >
                                            <Plus className='h-4 w-4 mr-2' />
                                            Add Innovation Strategy
                                        </Button>
                                    </div>
                                </div>

                                <div>
                                    <Label>Integration Discipline</Label>
                                    <div className='space-y-2 mt-2'>
                                        {data.improvements.integrationDiscipline.map(
                                            (item, index) => (
                                                <div
                                                    key={index}
                                                    className='flex gap-2'
                                                >
                                                    <Textarea
                                                        value={item}
                                                        onChange={(e) => {
                                                            const newItems = [
                                                                ...data
                                                                    .improvements
                                                                    .integrationDiscipline,
                                                            ];
                                                            newItems[index] =
                                                                e.target.value;
                                                            updateData(
                                                                'improvements.integrationDiscipline',
                                                                newItems
                                                            );
                                                        }}
                                                        rows={2}
                                                        className='flex-1'
                                                    />
                                                    <Button
                                                        variant='outline'
                                                        size='sm'
                                                        onClick={() => {
                                                            const newItems =
                                                                data.improvements.integrationDiscipline.filter(
                                                                    (_, i) =>
                                                                        i !==
                                                                        index
                                                                );
                                                            updateData(
                                                                'improvements.integrationDiscipline',
                                                                newItems
                                                            );
                                                        }}
                                                    >
                                                        <Trash2 className='h-4 w-4' />
                                                    </Button>
                                                </div>
                                            )
                                        )}
                                        <Button
                                            variant='outline'
                                            size='sm'
                                            onClick={() => {
                                                const newItems = [
                                                    ...data.improvements
                                                        .integrationDiscipline,
                                                    '',
                                                ];
                                                updateData(
                                                    'improvements.integrationDiscipline',
                                                    newItems
                                                );
                                            }}
                                        >
                                            <Plus className='h-4 w-4 mr-2' />
                                            Add Integration Strategy
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent
                            value='analysis'
                            className='space-y-6 mt-6'
                        >
                            <div className='grid grid-cols-1 gap-6'>
                                <div>
                                    <Label>Pre-Meeting Analysis</Label>
                                    <div className='grid grid-cols-2 gap-4 mt-2'>
                                        <div>
                                            <Label className='text-sm'>
                                                Dissatisfaction Elements
                                            </Label>
                                            <div className='space-y-2 mt-1'>
                                                {data.analysis.preMeeting.dissatisfaction.map(
                                                    (item, index) => (
                                                        <div
                                                            key={index}
                                                            className='flex gap-2'
                                                        >
                                                            <Input
                                                                value={item}
                                                                onChange={(
                                                                    e
                                                                ) => {
                                                                    const newItems =
                                                                        [
                                                                            ...data
                                                                                .analysis
                                                                                .preMeeting
                                                                                .dissatisfaction,
                                                                        ];
                                                                    newItems[
                                                                        index
                                                                    ] =
                                                                        e.target.value;
                                                                    updateData(
                                                                        'analysis.preMeeting.dissatisfaction',
                                                                        newItems
                                                                    );
                                                                }}
                                                                className='flex-1'
                                                            />
                                                            <Button
                                                                variant='outline'
                                                                size='sm'
                                                                onClick={() => {
                                                                    const newItems =
                                                                        data.analysis.preMeeting.dissatisfaction.filter(
                                                                            (
                                                                                _,
                                                                                i
                                                                            ) =>
                                                                                i !==
                                                                                index
                                                                        );
                                                                    updateData(
                                                                        'analysis.preMeeting.dissatisfaction',
                                                                        newItems
                                                                    );
                                                                }}
                                                            >
                                                                <Trash2 className='h-4 w-4' />
                                                            </Button>
                                                        </div>
                                                    )
                                                )}
                                                <Button
                                                    variant='outline'
                                                    size='sm'
                                                    onClick={() => {
                                                        const newItems = [
                                                            ...data.analysis
                                                                .preMeeting
                                                                .dissatisfaction,
                                                            '',
                                                        ];
                                                        updateData(
                                                            'analysis.preMeeting.dissatisfaction',
                                                            newItems
                                                        );
                                                    }}
                                                >
                                                    <Plus className='h-4 w-4 mr-2' />
                                                    Add Dissatisfaction
                                                </Button>
                                            </div>
                                        </div>
                                        <div>
                                            <Label className='text-sm'>
                                                EFESO Levers
                                            </Label>
                                            <div className='space-y-2 mt-1'>
                                                {data.analysis.preMeeting.levers.map(
                                                    (item, index) => (
                                                        <div
                                                            key={index}
                                                            className='flex gap-2'
                                                        >
                                                            <Input
                                                                value={item}
                                                                onChange={(
                                                                    e
                                                                ) => {
                                                                    const newItems =
                                                                        [
                                                                            ...data
                                                                                .analysis
                                                                                .preMeeting
                                                                                .levers,
                                                                        ];
                                                                    newItems[
                                                                        index
                                                                    ] =
                                                                        e.target.value;
                                                                    updateData(
                                                                        'analysis.preMeeting.levers',
                                                                        newItems
                                                                    );
                                                                }}
                                                                className='flex-1'
                                                            />
                                                            <Button
                                                                variant='outline'
                                                                size='sm'
                                                                onClick={() => {
                                                                    const newItems =
                                                                        data.analysis.preMeeting.levers.filter(
                                                                            (
                                                                                _,
                                                                                i
                                                                            ) =>
                                                                                i !==
                                                                                index
                                                                        );
                                                                    updateData(
                                                                        'analysis.preMeeting.levers',
                                                                        newItems
                                                                    );
                                                                }}
                                                            >
                                                                <Trash2 className='h-4 w-4' />
                                                            </Button>
                                                        </div>
                                                    )
                                                )}
                                                <Button
                                                    variant='outline'
                                                    size='sm'
                                                    onClick={() => {
                                                        const newItems = [
                                                            ...data.analysis
                                                                .preMeeting
                                                                .levers,
                                                            '',
                                                        ];
                                                        updateData(
                                                            'analysis.preMeeting.levers',
                                                            newItems
                                                        );
                                                    }}
                                                >
                                                    <Plus className='h-4 w-4 mr-2' />
                                                    Add Lever
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <Label>During Meeting Analysis</Label>
                                    <div className='grid grid-cols-2 gap-4 mt-2'>
                                        <div>
                                            <Label className='text-sm'>
                                                Dissatisfaction Elements
                                            </Label>
                                            <div className='space-y-2 mt-1'>
                                                {data.analysis.duringMeeting.dissatisfaction.map(
                                                    (item, index) => (
                                                        <div
                                                            key={index}
                                                            className='flex gap-2'
                                                        >
                                                            <Input
                                                                value={item}
                                                                onChange={(
                                                                    e
                                                                ) => {
                                                                    const newItems =
                                                                        [
                                                                            ...data
                                                                                .analysis
                                                                                .duringMeeting
                                                                                .dissatisfaction,
                                                                        ];
                                                                    newItems[
                                                                        index
                                                                    ] =
                                                                        e.target.value;
                                                                    updateData(
                                                                        'analysis.duringMeeting.dissatisfaction',
                                                                        newItems
                                                                    );
                                                                }}
                                                                className='flex-1'
                                                            />
                                                            <Button
                                                                variant='outline'
                                                                size='sm'
                                                                onClick={() => {
                                                                    const newItems =
                                                                        data.analysis.duringMeeting.dissatisfaction.filter(
                                                                            (
                                                                                _,
                                                                                i
                                                                            ) =>
                                                                                i !==
                                                                                index
                                                                        );
                                                                    updateData(
                                                                        'analysis.duringMeeting.dissatisfaction',
                                                                        newItems
                                                                    );
                                                                }}
                                                            >
                                                                <Trash2 className='h-4 w-4' />
                                                            </Button>
                                                        </div>
                                                    )
                                                )}
                                                <Button
                                                    variant='outline'
                                                    size='sm'
                                                    onClick={() => {
                                                        const newItems = [
                                                            ...data.analysis
                                                                .duringMeeting
                                                                .dissatisfaction,
                                                            '',
                                                        ];
                                                        updateData(
                                                            'analysis.duringMeeting.dissatisfaction',
                                                            newItems
                                                        );
                                                    }}
                                                >
                                                    <Plus className='h-4 w-4 mr-2' />
                                                    Add Dissatisfaction
                                                </Button>
                                            </div>
                                        </div>
                                        <div>
                                            <Label className='text-sm'>
                                                EFESO Levers
                                            </Label>
                                            <div className='space-y-2 mt-1'>
                                                {data.analysis.duringMeeting.levers.map(
                                                    (item, index) => (
                                                        <div
                                                            key={index}
                                                            className='flex gap-2'
                                                        >
                                                            <Input
                                                                value={item}
                                                                onChange={(
                                                                    e
                                                                ) => {
                                                                    const newItems =
                                                                        [
                                                                            ...data
                                                                                .analysis
                                                                                .duringMeeting
                                                                                .levers,
                                                                        ];
                                                                    newItems[
                                                                        index
                                                                    ] =
                                                                        e.target.value;
                                                                    updateData(
                                                                        'analysis.duringMeeting.levers',
                                                                        newItems
                                                                    );
                                                                }}
                                                                className='flex-1'
                                                            />
                                                            <Button
                                                                variant='outline'
                                                                size='sm'
                                                                onClick={() => {
                                                                    const newItems =
                                                                        data.analysis.duringMeeting.levers.filter(
                                                                            (
                                                                                _,
                                                                                i
                                                                            ) =>
                                                                                i !==
                                                                                index
                                                                        );
                                                                    updateData(
                                                                        'analysis.duringMeeting.levers',
                                                                        newItems
                                                                    );
                                                                }}
                                                            >
                                                                <Trash2 className='h-4 w-4' />
                                                            </Button>
                                                        </div>
                                                    )
                                                )}
                                                <Button
                                                    variant='outline'
                                                    size='sm'
                                                    onClick={() => {
                                                        const newItems = [
                                                            ...data.analysis
                                                                .duringMeeting
                                                                .levers,
                                                            '',
                                                        ];
                                                        updateData(
                                                            'analysis.duringMeeting.levers',
                                                            newItems
                                                        );
                                                    }}
                                                >
                                                    <Plus className='h-4 w-4 mr-2' />
                                                    Add Lever
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <Label>Follow-up Actions</Label>
                                    <div className='space-y-4 mt-2'>
                                        {data.followUp.map((action, index) => (
                                            <div
                                                key={index}
                                                className='border rounded-lg p-4 space-y-3'
                                            >
                                                <div className='grid grid-cols-4 gap-3'>
                                                    <Input
                                                        placeholder='Action'
                                                        value={action.action}
                                                        onChange={(e) =>
                                                            updateData(
                                                                `followUp.${index}.action`,
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                    <Input
                                                        placeholder='Who'
                                                        value={action.who}
                                                        onChange={(e) =>
                                                            updateData(
                                                                `followUp.${index}.who`,
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                    <Input
                                                        placeholder='When'
                                                        value={action.when}
                                                        onChange={(e) =>
                                                            updateData(
                                                                `followUp.${index}.when`,
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                    <div className='flex gap-2'>
                                                        <Input
                                                            placeholder='Zoho'
                                                            value={action.zoho}
                                                            onChange={(e) =>
                                                                updateData(
                                                                    `followUp.${index}.zoho`,
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            className='flex-1'
                                                        />
                                                        <Button
                                                            variant='outline'
                                                            size='sm'
                                                            onClick={() =>
                                                                removeArrayItem(
                                                                    'followUp',
                                                                    index
                                                                )
                                                            }
                                                        >
                                                            <Trash2 className='h-4 w-4' />
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                        <Button
                                            variant='outline'
                                            onClick={() =>
                                                addArrayItem('followUp', {
                                                    action: '',
                                                    who: '',
                                                    when: '',
                                                    zoho: '',
                                                })
                                            }
                                        >
                                            <Plus className='h-4 w-4 mr-2' />
                                            Add Follow-up Action
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </TabsContent>
                    </Tabs>

                    <div className='flex justify-end mt-8 gap-4'>
                        <Button
                            className={buttonVariants({
                                variant: 'efeso',
                                size: 'lg',
                            })}
                            onClick={() => {
                                reset();
                                toast({
                                    title: 'Form reset',
                                    description:
                                        'All fields have been cleared.',
                                });
                                setShouldResetData(true);
                            }}
                        >
                            Reset
                        </Button>

                        <Button
                            asChild
                            className={buttonVariants({
                                variant: 'efeso',
                                size: 'lg',
                            })}
                        >
                            <Link to='/presentation'>Preview Presentation</Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
