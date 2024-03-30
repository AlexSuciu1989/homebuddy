import React from 'react';

const saveToSQL: React.FC = () => {
    const submitData = async (event: React.FormEvent<HTMLButtonElement>) => {
        event.preventDefault();
        const dataFromArray: string[] = [];

        const tableFirstRow = document.querySelector('tbody > tr:first-child');
        tableFirstRow?.querySelectorAll('.ant-table-cell').forEach((cell) =>{
            dataFromArray.push(cell.textContent || '');
        });

        const objectToSubmit = {
            date: dataFromArray[0],
            expense: dataFromArray[1],
            description: dataFromArray[2],
            tag: dataFromArray[3]
        };
        console.log(objectToSubmit);
    };

    return (
        <button onClick={submitData}>
            Submit Data
        </button>
    );
};

export default saveToSQL;
