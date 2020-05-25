import React from 'react'
import style from './Loader.module.scss';

export const Loader = () => {
    return (
        <div className={`${style.wrapper} d-flex text-center`}>
            <div role="status" className={`${style.spinner} spinner-border text-secondary m-auto`}>
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    )
};