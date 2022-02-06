import type { FC } from 'react';
import styles from './customButton.module.scss';
import type React from 'react';

interface IButtonProps {
    onClick?: ((event: React.MouseEvent<HTMLButtonElement>) => void) | undefined;
    type?: 'button' | 'submit' | 'reset';
    className?: string;
    disabled?: boolean;
    color?:string
}

const CustomButton: FC<IButtonProps> = ({ className, onClick, children, type, disabled,color }) => {
    return (
        <button  style={{backgroundColor: color}} className={`${styles.customButton} ${className}`} onClick={onClick} type={type} disabled={disabled}>
            {children}
        </button>
    );
};

export default CustomButton;
