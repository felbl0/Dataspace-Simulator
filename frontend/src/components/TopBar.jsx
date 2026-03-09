import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sun, Moon, ArrowLeft, RotateCcw } from 'lucide-react';

import './Components.css';

const TopBar = ({
    onAddParticipant,
    onReset,

    isDemo = false,
    showBackButton = false,
    title = 'Data Space Demo',
    showThemeToggle = false,
    dataspaceCode = null,
    dataspaceName = null,
    backTo = '/'
}) => {
    const [copied, setCopied] = useState(false);
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem('theme') || 'light';
    });

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
    };

    const copyJoinCode = () => {
        if (dataspaceCode) {
            navigator.clipboard.writeText(dataspaceCode);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <div className="top-bar">
            <div className="top-bar-left">
                {showBackButton && (
                    <Link to={backTo} className="back-button" title="Back">
                        <ArrowLeft size={20} />
                    </Link>
                )}
            </div>
            <div className="top-bar-center">
                <div className="top-bar-title">{title}</div>
            </div>
            <div className="top-bar-right">
                {showThemeToggle && (
                    <button onClick={toggleTheme} className="theme-toggle" title="Toggle theme">
                        {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
                    </button>
                )}
                {isDemo && onReset && (
                    <button onClick={onReset} className="reset-btn">
                        <RotateCcw size={16} />
                        Reset
                    </button>
                )}

                {isDemo && (
                    <button onClick={onAddParticipant} className="action-btn participant-btn">
                        + Add Participant
                    </button>
                )}
            </div>
        </div>
    );
};

export default TopBar;
