import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { X, ChevronDown, ChevronUp } from 'lucide-react';
import { ONTOLOGY_OPTIONS, DOMAIN_OPTIONS } from '../constants';

const EditParticipantDialog = ({ show, participantData, name, bpn, onSave, onCancel }) => {
    const [editForm, setEditForm] = useState({
        name: name,
        bpn: bpn,
        location: '',
        dspEndpoint: '',
        catalogUrl: '',
        roles: { provider: true, consumer: true },
        domain: '',
        ontologies: [],
        dataCategories: [],
        formats: [],
        tags: '',
        ...participantData
    });

    const [showEditAdvanced, setShowEditAdvanced] = useState(false);

    const handleSave = () => {
        onSave(editForm);
    };

    if (!show) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(0,0,0,0.7)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 1000
            }}
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onWheel={(e) => e.stopPropagation()}
                style={{
                    background: 'var(--bg-card)',
                    padding: '24px',
                    borderRadius: '12px',
                    border: '1px solid var(--border-subtle)',
                    width: '500px',
                    maxHeight: '80vh',
                    overflow: 'auto',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.5)'
                }}
            >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h3 style={{ margin: 0, color: 'var(--text-primary)' }}>Edit Participant</h3>
                    <button
                        onClick={onCancel}
                        style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '4px' }}
                    >
                        <X size={20} />
                    </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    <div>
                        <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '4px' }}>Name *</label>
                        <input
                            type="text"
                            value={editForm.name}
                            onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                            onClick={(e) => e.stopPropagation()}
                            style={{ width: '100%', padding: '8px 10px', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '6px', color: 'var(--text-primary)', fontSize: '0.9rem', boxSizing: 'border-box' }}
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '4px' }}>BPN *</label>
                        <input
                            type="text"
                            value={editForm.bpn}
                            onChange={(e) => setEditForm({ ...editForm, bpn: e.target.value })}
                            onClick={(e) => e.stopPropagation()}
                            style={{ width: '100%', padding: '8px 10px', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '6px', color: 'var(--text-primary)', fontSize: '0.9rem', fontFamily: 'monospace', boxSizing: 'border-box' }}
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '4px' }}>Location</label>
                        <input
                            type="text"
                            value={editForm.location || ''}
                            onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                            onClick={(e) => e.stopPropagation()}
                            placeholder="e.g. Munich, Germany"
                            style={{ width: '100%', padding: '8px 10px', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '6px', color: 'var(--text-primary)', fontSize: '0.9rem', boxSizing: 'border-box' }}
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '4px' }}>DSP Endpoint</label>
                        <input
                            type="text"
                            value={editForm.dspEndpoint || ''}
                            onChange={(e) => setEditForm({ ...editForm, dspEndpoint: e.target.value, catalogUrl: e.target.value ? `${e.target.value}/catalog` : '' })}
                            onClick={(e) => e.stopPropagation()}
                            placeholder="https://connector.example.com/api/dsp"
                            style={{ width: '100%', padding: '8px 10px', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '6px', color: 'var(--text-primary)', fontSize: '0.85rem', fontFamily: 'monospace', boxSizing: 'border-box' }}
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '6px' }}>Roles</label>
                        <div style={{ display: 'flex', gap: '12px' }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)', fontSize: '0.85rem', cursor: 'pointer' }}>
                                <input
                                    type="checkbox"
                                    checked={editForm.roles?.provider || false}
                                    onChange={(e) => setEditForm({ ...editForm, roles: { ...editForm.roles, provider: e.target.checked } })}
                                    onClick={(e) => e.stopPropagation()}
                                />
                                Provider
                            </label>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)', fontSize: '0.85rem', cursor: 'pointer' }}>
                                <input
                                    type="checkbox"
                                    checked={editForm.roles?.consumer || false}
                                    onChange={(e) => setEditForm({ ...editForm, roles: { ...editForm.roles, consumer: e.target.checked } })}
                                    onClick={(e) => e.stopPropagation()}
                                />
                                Consumer
                            </label>
                        </div>
                    </div>

                    <button
                        onClick={(e) => { e.stopPropagation(); setShowEditAdvanced(!showEditAdvanced); }}
                        style={{
                            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                            width: '100%', padding: '10px', background: 'rgba(59, 130, 246, 0.1)',
                            border: '1px solid var(--border-subtle)', borderRadius: '6px', color: '#93c5fd',
                            cursor: 'pointer', fontSize: '0.85rem'
                        }}
                    >
                        <span>Metadata</span>
                        {showEditAdvanced ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>

                    <AnimatePresence>
                        {showEditAdvanced && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: '14px' }}
                            >
                                <div>
                                    <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '4px' }}>Domain</label>
                                    <select
                                        value={editForm.domain || ''}
                                        onChange={(e) => setEditForm({ ...editForm, domain: e.target.value })}
                                        onClick={(e) => e.stopPropagation()}
                                        style={{ width: '100%', padding: '8px 10px', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '6px', color: 'var(--text-primary)', fontSize: '0.9rem' }}
                                    >
                                        <option value="">-- Select --</option>
                                        {DOMAIN_OPTIONS.map(d => <option key={d} value={d}>{d}</option>)}
                                    </select>
                                </div>

                                <div>
                                    <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '6px' }}>Ontologies</label>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                                        {ONTOLOGY_OPTIONS.map(ont => (
                                            <button
                                                key={ont}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    const current = editForm.ontologies || [];
                                                    setEditForm({
                                                        ...editForm,
                                                        ontologies: current.includes(ont) ? current.filter(o => o !== ont) : [...current, ont]
                                                    });
                                                }}
                                                style={{
                                                    padding: '4px 10px', borderRadius: '12px', fontSize: '0.75rem', cursor: 'pointer',
                                                    border: (editForm.ontologies || []).includes(ont) ? '1px solid #3b82f6' : '1px solid #64748b',
                                                    background: (editForm.ontologies || []).includes(ont) ? 'rgba(59, 130, 246, 0.2)' : 'transparent',
                                                    color: (editForm.ontologies || []).includes(ont) ? '#93c5fd' : '#94a3b8'
                                                }}
                                            >
                                                {ont}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '4px' }}>Tags</label>
                                    <input
                                        type="text"
                                        value={Array.isArray(editForm.tags) ? editForm.tags.join(', ') : (editForm.tags || '')}
                                        onChange={(e) => setEditForm({ ...editForm, tags: e.target.value.split(',').map(t => t.trim()).filter(t => t) })}
                                        onClick={(e) => e.stopPropagation()}
                                        placeholder="e.g. Construction, Infrastructure"
                                        style={{ width: '100%', padding: '8px 10px', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '6px', color: 'var(--text-primary)', fontSize: '0.9rem', boxSizing: 'border-box' }}
                                    />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '20px' }}>
                    <button
                        onClick={onCancel}
                        style={{ padding: '8px 16px', background: 'transparent', border: '1px solid var(--border-subtle)', borderRadius: '6px', color: 'var(--text-muted)', cursor: 'pointer' }}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        style={{ padding: '8px 16px', background: '#3b82f6', border: 'none', borderRadius: '6px', color: 'var(--text-primary)', cursor: 'pointer' }}
                    >
                        Save
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default EditParticipantDialog;
