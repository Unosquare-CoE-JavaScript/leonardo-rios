import React, { useContext } from 'react';
import './ClapTotal.css';
import { MediumClapContext } from 'components/molecules/MediumClap/MediumClap';
const ClapTotal: React.FC<{ userStyles?: Object, className?: string }> = ({
    userStyles, className = "", ...restProps }) => {
    const { countTotal, setRef } = useContext(MediumClapContext);
    return (
        <span
            ref={setRef}
            data-refkey='clapTotalRef'
            className={`total ${className}`}
            style={userStyles}
            {...restProps}
        >
            {countTotal}
        </span >
    )
}

export default ClapTotal;