import React, { useState } from 'react';
import { Sale } from '../types/product'; 
import { parseISO, format } from 'date-fns';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

interface Props {
    salesData: Sale[];
}

const ProductSalesTable: React.FC<Props> = ({ salesData }) => {
    const slicedSalesData = salesData.slice(0, 10)
    const [sortColumn, setSortColumn] = useState<string | null>('weekEnding');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc' | null>('asc');

    const handleSort = (columnName: string) => {
        if (sortColumn === columnName) {
            // Toggle sort direction if the same column header is clicked
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            // Set new sort column and default sort direction to ascending
            setSortColumn(columnName);
            setSortDirection('asc');
        }
    };

    const renderHeaderCell = (columnName: string, label: string) => (
        <th onClick={() => handleSort(columnName)}>
            <span>{label}{' '}</span>
            {sortColumn === columnName && (
                <span className='arrow'>{
                    sortDirection === 'asc' ? <KeyboardArrowDownIcon fontSize='small' /> : 
                        <KeyboardArrowUpIcon fontSize='small' />
                    }
                </span>
            )}
            {sortColumn !== columnName && (
                <span className='arrow'>
                    <KeyboardArrowDownIcon fontSize='small' />
                </span>
            )}
        </th>
    );


    const sortedData = [...slicedSalesData].sort((a, b) => {
        if (!sortColumn) return 0; 

        const valueA = a[sortColumn as keyof Sale];
        const valueB = b[sortColumn as keyof Sale];

        if (sortDirection === 'asc') {
            return valueA > valueB ? 1 : valueA < valueB ? -1 : 0;
        } else {
            return valueB > valueA ? 1 : valueB < valueA ? -1 : 0;
        }
    });

    const formatDate = (dateString: string): string => {
        const parsedDate = parseISO(dateString); 
        return format(parsedDate, 'MM-dd-yy'); 
    };

    const formatSalesAmount = (amount: number): string => {
        const formattedAmount = amount.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
        return formattedAmount.slice(1); 
    };

    

    return (
        <div className="product-sales-table">
            <table>
                <thead>
                    <tr className='header-names'>
                        {renderHeaderCell('weekEnding', 'Week Ending')}
                        {renderHeaderCell('retailSales', 'Retail Sales')}
                        {renderHeaderCell('wholesaleSales', 'Wholesale Sales')}
                        {renderHeaderCell('unitsSold', 'Units Sold')}
                        {renderHeaderCell('retailerMargin', 'Retailer Margin')}
                    </tr>
                </thead>
                <tbody>
                    {sortedData.map((sale, index) => (
                        <tr key={index}>
                            <td>{formatDate(sale.weekEnding)}</td>
                            <td>${formatSalesAmount(sale.retailSales)}</td>
                            <td>${formatSalesAmount(sale.wholesaleSales)}</td>
                            <td>{sale.unitsSold}</td>
                            <td>${formatSalesAmount(sale.retailerMargin)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductSalesTable;