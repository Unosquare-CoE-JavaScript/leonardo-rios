import React, { useContext } from 'react';
import './ClapCount.css';
import { MediumClapContext } from '../../molecules/MediumClap/MediumClap';

const ClapCount: React.FC<{ userStyles?: Object, className?: string }> =
    ({ userStyles, className = "", ...restProps }) => {
        const { count, setRef } = useContext(MediumClapContext);
        return (
            <span
                ref={setRef}
                data-refKey='clapCountRef'
                className={`count ${className}`}
                style={userStyles}
                {...restProps}
            >
                +{count}
            </span >
        )
    }


export default ClapCount;