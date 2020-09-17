import React from 'react';
import { ReactComponent as Ups } from '../../assets/svg/gunter-ups.svg';
import { trans } from '../..//trans/trans';
import styles from './ErrorBoundary.module.css';
import Button from '@material-ui/core/Button';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    reload() {
        window.location.reload();
    }

    render() {
        if (this.state.hasError || !this.props.children) {
            return (
                <div className={styles.container}>
                    <div className={styles.svg_container}>
                        <Ups />
                    </div>
                    <Button variant="contained" onClick={this.reload}>{trans('words.reload')}</Button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;