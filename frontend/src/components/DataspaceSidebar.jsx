import React, { useMemo, useState } from 'react';
import { ChevronRight, ChevronLeft, Plus, Database, Trash2 } from 'lucide-react';

function makeCode(name) {
    const base = String(name || 'space')
        .toUpperCase()
        .replace(/[^A-Z0-9]+/g, '')
        .slice(0, 6) || 'SPACE';
    return `${base}-${Math.random().toString(36).slice(2, 5).toUpperCase()}`;
}

export default function DataspaceSidebar({
    dataspaces,
    activeDataspaceId,
    onSelect,
    onCreate,
    onDelete,
    collapsed,
    onToggle,
}) {
    const [draftName, setDraftName] = useState('');

    const active = useMemo(
        () => dataspaces.find((d) => d.id === activeDataspaceId),
        [dataspaces, activeDataspaceId]
    );

    const submitCreate = () => {
        const trimmed = draftName.trim();
        if (!trimmed) return;
        onCreate({
            name: trimmed,
            code: makeCode(trimmed),
            isDemo: false,
        });
        setDraftName('');
    };

    return (
        <div className={`dataspace-sidebar ${collapsed ? 'collapsed' : ''}`}>
            <button className="dataspace-sidebar-toggle" onClick={onToggle} title={collapsed ? 'Open sidebar' : 'Close sidebar'}>
                {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
            </button>

            {!collapsed && (
                <>
                    <div className="dataspace-sidebar-header">
                        <div className="dataspace-sidebar-title">Dataspaces</div>
                        <div className="dataspace-sidebar-subtitle">Session switcher</div>
                    </div>

                    <div className="dataspace-list">
                        {dataspaces.map((space) => {
                            const isActive = space.id === activeDataspaceId;
                            return (
                                <button
                                    key={space.id}
                                    className={`dataspace-item ${isActive ? 'active' : ''}`}
                                    onClick={() => onSelect(space.id)}
                                >
                                    <div className="dataspace-item-main">
                                        <Database size={13} />
                                        <span className="dataspace-item-name">{space.name}</span>
                                    </div>
                                    <div className="dataspace-item-right">
                                        <span className="dataspace-item-code">{space.code}</span>
                                        {!space.isDemo && (
                                            <span
                                                className="dataspace-delete"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    onDelete(space.id);
                                                }}
                                                title="Delete dataspace"
                                            >
                                                <Trash2 size={12} />
                                            </span>
                                        )}
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                    <div className="dataspace-create">
                        <input
                            value={draftName}
                            onChange={(e) => setDraftName(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') submitCreate();
                            }}
                            placeholder="New dataspace name"
                            className="dataspace-create-input"
                        />
                        <button className="dataspace-create-btn" onClick={submitCreate}>
                            <Plus size={13} /> New
                        </button>
                    </div>

                    <div className="dataspace-active-note">
                        Active: <strong>{active?.name || 'n/a'}</strong>
                    </div>
                </>
            )}
        </div>
    );
}
