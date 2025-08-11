import React, { useState, useEffect, useRef } from 'react';

// BJJ Belt-inspired color palette
const TAG_COLORS = {
  'Training': { bg: '#E5E5E5', text: '#18181b', hover: '#D6D3CE' },
  'Technique': { bg: '#4A90E2', text: '#fff', hover: '#3B6FB1' },
  'Guard': { bg: '#8E44AD', text: '#fff', hover: '#6F3587' },
  'Mount': { bg: '#8B572A', text: '#fff', hover: '#6C4522' },
  'Side Control': { bg: '#333333', text: '#fff', hover: '#2A2A2A' },
  'Back Control': { bg: '#27AE60', text: '#fff', hover: '#1F8C4D' },
  'Submissions': { bg: '#E74C3C', text: '#fff', hover: '#B93C30' },
  'Escapes': { bg: '#F39C12', text: '#18181b', hover: '#C37D0E' },
  'Sweeps': { bg: '#9B59B6', text: '#fff', hover: '#7D3F98' },
  'Passes': { bg: '#3498DB', text: '#fff', hover: '#2980B9' },
  'Competition': { bg: '#E67E22', text: '#fff', hover: '#D35400' },
  'Rolling': { bg: '#2ECC71', text: '#fff', hover: '#27AE60' },
  'Drilling': { bg: '#34495E', text: '#fff', hover: '#2C3E50' },
  'Fundamentals': { bg: '#95A5A6', text: '#18181b', hover: '#7F8C8D' },
  'Advanced': { bg: '#8E44AD', text: '#fff', hover: '#7D3C98' },
  'Flow': { bg: '#1ABC9C', text: '#fff', hover: '#16A085' },
  'Cardio': { bg: '#E91E63', text: '#fff', hover: '#C2185B' },
  'Strength': { bg: '#FF5722', text: '#fff', hover: '#E64A19' },
  'Flexibility': { bg: '#009688', text: '#fff', hover: '#00796B' },
  'Mental Game': { bg: '#607D8B', text: '#fff', hover: '#546E7A' },
  'Strategy': { bg: '#795548', text: '#fff', hover: '#6D4C41' },
  'Recovery': { bg: '#4CAF50', text: '#fff', hover: '#43A047' },
  'Injury': { bg: '#F44336', text: '#fff', hover: '#E53935' },
  'Goals': { bg: '#FF9800', text: '#18181b', hover: '#F57C00' },
  'custom-neutral': { bg: '#A8A29E', text: '#18181b', hover: '#D6D3CE' },
  'custom-pop': { bg: '#B08D57', text: '#18181b', hover: '#9C7B49' }
};

const getTagColors = (tag, isPop = false) => {
  if (isPop) return TAG_COLORS['custom-pop'];
  return TAG_COLORS[tag] || TAG_COLORS['custom-neutral'];
};

const Header = ({ isDark, toggleDarkMode }) => {
  const handleDarkModeClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleDarkMode();
  };

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      width: '100%',
      backgroundColor: isDark ? 'rgba(0,0,0,0.8)' : 'rgba(245,240,230,0.95)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      borderBottom: isDark ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(0,0,0,0.06)'
    }}>
      <div style={{
        maxWidth: '768px',
        margin: '0 auto',
        padding: '16px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div>
          <h1 style={{
            fontSize: '24px',
            fontWeight: '900',
            letterSpacing: '-0.025em',
            color: isDark ? '#ffffff' : '#000000',
            margin: 0
          }}>PULSE BJJ</h1>
          <p style={{
            fontSize: '14px',
            color: isDark ? '#a1a1aa' : '#71717a',
            marginTop: '2px',
            margin: 0
          }}>Train smarter. Roll better.</p>
        </div>
        <button 
          type="button"
          onClick={handleDarkModeClick}
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '12px',
            backgroundColor: isDark ? '#27272a' : '#f5f5f4',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s'
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{color: isDark ? '#a1a1aa' : '#52525b'}}>
            {isDark ? (
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            ) : (
              <g>
                <circle cx="12" cy="12" r="5"/>
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
              </g>
            )}
          </svg>
        </button>
      </div>
    </header>
  );
};

const ChatLog = ({ messages, isTyping, isDark, onQuickPrompt }) => {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  const groupedMessages = messages.reduce((groups, message, index) => {
    if (index === 0 || messages[index - 1].sender !== message.sender) {
      groups.push([message]);
    } else {
      groups[groups.length - 1].push(message);
    }
    return groups;
  }, []);

  const formatTime = (timestamp) => {
    try {
      return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch {
      return 'now';
    }
  };

  return (
    <div style={{
      flex: 1,
      overflowY: 'auto',
      paddingBottom: '120px'
    }}>
      <div style={{
        maxWidth: '768px',
        margin: '0 auto',
        padding: '24px 20px'
      }}>
        {messages.filter(m => m.sender === 'user').length === 0 && (
          <div style={{
            marginBottom: '24px',
            padding: '20px',
            borderRadius: '16px',
            backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.5)',
            border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`
          }}>
            <h3 style={{
              fontSize: '16px',
              fontWeight: '600',
              color: isDark ? '#ffffff' : '#000000',
              marginBottom: '12px'
            }}>Quick Start</h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '8px'
            }}>
              {[
                "How do I escape side control?",
                "Best warm-up routine for BJJ?",
                "Tips for my first competition?",
                "How to improve my guard passing?"
              ].map((prompt, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => onQuickPrompt(prompt)}
                  style={{
                    padding: '8px 12px',
                    textAlign: 'left',
                    backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.8)',
                    border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
                    borderRadius: '8px',
                    color: isDark ? '#ffffff' : '#000000',
                    fontSize: '13px',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        )}

        {groupedMessages.map((group, groupIndex) => (
          <div key={groupIndex} style={{
            display: 'flex', 
            flexDirection: 'column', 
            gap: '8px',
            marginBottom: '16px',
            alignItems: group[0].sender === 'user' ? 'flex-end' : 'flex-start'
          }}>
            {group.map((message, messageIndex) => (
              <div key={messageIndex} style={{
                maxWidth: '85%'
              }}>
                <div style={{
                  padding: '12px 16px',
                  borderRadius: '16px',
                  backgroundColor: message.sender === 'user' ? '#18181b' : (isDark ? '#27272a' : '#ffffff'),
                  color: message.sender === 'user' ? '#fafaf9' : (isDark ? '#f4f4f5' : '#18181b'),
                  border: message.sender === 'user' ? 'none' : `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
                  boxShadow: message.sender === 'bot' ? '0 1px 2px rgba(0,0,0,0.05)' : 'none'
                }}>
                  <div style={{
                    fontSize: '14px',
                    lineHeight: '1.5',
                    whiteSpace: 'pre-wrap',
                    fontWeight: message.sender === 'user' ? '500' : '400'
                  }}>
                    {message.text}
                  </div>
                </div>
              </div>
            ))}
            <div style={{
              fontSize: '11px', 
              color: isDark ? '#71717a' : '#a1a1aa',
              padding: '0 8px',
              marginTop: '4px',
              textAlign: group[0].sender === 'user' ? 'right' : 'left'
            }}>
              {formatTime(group[group.length - 1].timestamp)}
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
            <div style={{
              padding: '12px 16px',
              borderRadius: '16px',
              backgroundColor: isDark ? '#27272a' : '#ffffff',
              border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
              boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
            }}>
              <div style={{display: 'flex', gap: '6px'}}>
                {[0, 1, 2].map((i) => (
                  <div key={i} style={{
                    width: '6px',
                    height: '6px',
                    backgroundColor: isDark ? '#71717a' : '#a1a1aa',
                    borderRadius: '50%',
                    animation: `bounce 1.4s infinite ease-in-out`,
                    animationDelay: `${i * 0.12}s`
                  }} />
                ))}
              </div>
            </div>
            <span style={{fontSize: '11px', color: isDark ? '#71717a' : '#a1a1aa'}}>Coach is typing...</span>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

const Composer = ({ input, setInput, onSubmit, isDark, isRecording, onVoiceToggle }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onSubmit(e);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSubmit(e);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      bottom: '60px',
      left: 0,
      right: 0,
      backgroundColor: isDark ? 'rgba(0,0,0,0.8)' : 'rgba(245,240,230,0.95)',
      borderTop: isDark ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(0,0,0,0.06)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)'
    }}>
      <div style={{
        maxWidth: '768px',
        margin: '0 auto',
        padding: '16px 20px',
        position: 'relative'
      }}>
        <form onSubmit={handleSubmit} style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
          <button 
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onVoiceToggle();
            }}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: isRecording ? '#dc2626' : (isDark ? '#27272a' : '#ffffff'),
              border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
              cursor: 'pointer',
              flexShrink: 0,
              transition: 'all 0.2s',
              animation: isRecording ? 'pulse 2s infinite' : 'none'
            }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" 
                 style={{color: isRecording ? '#ffffff' : (isDark ? '#a1a1aa' : '#71717a')}}>
              <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
              <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
              <path d="M12 19v4"/>
              <path d="M8 23h8"/>
            </svg>
          </button>
          <input
            type="text"
            style={{
              flex: 1,
              padding: '12px 16px',
              borderRadius: '12px',
              backgroundColor: isDark ? '#27272a' : '#ffffff',
              color: isDark ? '#ffffff' : '#000000',
              border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
              outline: 'none',
              fontSize: '14px',
              fontFamily: 'inherit'
            }}
            placeholder={isRecording ? "Listening..." : "Ask about techniques, strategy, or get personalized advice..."}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isRecording}
          />
          <button 
            type="submit"
            style={{
              padding: '12px 24px',
              borderRadius: '12px',
              backgroundColor: '#18181b',
              color: '#fafaf9',
              fontWeight: 'bold',
              fontSize: '14px',
              border: 'none',
              cursor: 'pointer',
              flexShrink: 0
            }}>
            OSS
          </button>
        </form>
      </div>
    </div>
  );
};

const Journal = ({ isDark, entries, setEntries }) => {
  const [newEntry, setNewEntry] = useState('');
  const [selectedTags, setSelectedTags] = useState(['Training']);
  const [customTag, setCustomTag] = useState('');
  const [showCustomTag, setShowCustomTag] = useState(false);
  const [makeCustomPop, setMakeCustomPop] = useState(false);
  const [attachments, setAttachments] = useState([]);
  const fileInputRef = useRef(null);

  const availableTags = [
    'Training', 'Technique', 'Guard', 'Mount', 'Side Control', 'Back Control',
    'Submissions', 'Escapes', 'Sweeps', 'Passes', 'Competition', 'Rolling',
    'Drilling', 'Fundamentals', 'Advanced', 'Flow', 'Cardio', 'Strength',
    'Flexibility', 'Mental Game', 'Strategy', 'Recovery', 'Injury', 'Goals'
  ];

  const autoTagEntry = (content, filename = '') => {
    const text = (content + ' ' + filename).toLowerCase();
    const autoTags = [];
    
    const tagKeywords = {
      'Guard': ['guard', 'closed guard', 'open guard', 'half guard', 'butterfly'],
      'Mount': ['mount', 'mounted', 'full mount'],
      'Side Control': ['side control', 'side mount', 'knee on belly'],
      'Back Control': ['back control', 'rear naked', 'hooks'],
      'Submissions': ['armbar', 'triangle', 'choke', 'kimura', 'americana', 'submission'],
      'Escapes': ['escape', 'shrimp', 'bridge', 'getting out'],
      'Sweeps': ['sweep', 'swept', 'scissor sweep', 'flower sweep'],
      'Passes': ['pass', 'guard pass', 'knee slice', 'toreando'],
      'Competition': ['competition', 'tournament', 'match', 'compete'],
      'Rolling': ['roll', 'rolling', 'sparring', 'live training'],
      'Drilling': ['drill', 'drilling', 'rep', 'practice'],
      'Cardio': ['cardio', 'conditioning', 'tired', 'endurance'],
      'Mental Game': ['mental', 'focus', 'anxiety', 'confidence', 'pressure'],
      'Technique': ['technique', 'technical', 'move', 'position'],
      'Strategy': ['strategy', 'game plan', 'tactics', 'approach']
    };

    Object.entries(tagKeywords).forEach(([tag, keywords]) => {
      if (keywords.some(keyword => text.includes(keyword))) {
        autoTags.push(tag);
      }
    });

    return autoTags.length > 0 ? autoTags : ['Training'];
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const newAttachments = files.map(file => ({
      id: Date.now() + Math.random(),
      file,
      name: file.name,
      type: file.type,
      size: file.size,
      url: URL.createObjectURL(file)
    }));
    
    setAttachments(prev => [...prev, ...newAttachments]);
    
    const fileNames = files.map(f => f.name).join(' ');
    const suggestedTags = autoTagEntry('', fileNames);
    setSelectedTags(prev => [...new Set([...prev, ...suggestedTags])]);
  };

  const removeAttachment = (id) => {
    setAttachments(prev => {
      const attachment = prev.find(a => a.id === id);
      if (attachment) URL.revokeObjectURL(attachment.url);
      return prev.filter(a => a.id !== id);
    });
  };

  const addCustomTag = () => {
    if (!customTag.trim()) return;
    
    const newTag = customTag.trim();
    setSelectedTags(prev => [...new Set([...prev, newTag])]);
    setCustomTag('');
    setShowCustomTag(false);
    setMakeCustomPop(false);
  };

  const addEntry = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    if (!newEntry.trim()) return;
    
    const autoTags = autoTagEntry(newEntry, attachments.map(a => a.name).join(' '));
    const finalTags = [...new Set([...selectedTags, ...autoTags])];
    
    const entry = {
      id: Date.now(),
      date: 'TODAY',
      time: 'Just now',
      title: newEntry.split('\n')[0].substring(0, 50) || 'Training Session',
      content: newEntry,
      tags: finalTags,
      attachments: attachments.map(a => ({ 
        id: a.id,
        name: a.name, 
        type: a.type, 
        size: a.size 
      })),
      customTags: selectedTags.filter(tag => !availableTags.includes(tag)).map(tag => ({
        name: tag,
        isPop: makeCustomPop
      }))
    };
    
    setEntries(prev => [entry, ...prev]);
    setNewEntry('');
    setSelectedTags(['Training']);
    setAttachments([]);
    setCustomTag('');
    setShowCustomTag(false);
    setMakeCustomPop(false);
    
    attachments.forEach(a => URL.revokeObjectURL(a.url));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      addEntry();
    }
  };

  const toggleTag = (tag) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const getFileIcon = (type) => {
    if (type.startsWith('image/')) return '🖼️';
    if (type.startsWith('video/')) return '🎥';
    if (type.includes('pdf')) return '📄';
    if (type.startsWith('audio/')) return '🎵';
    return '📎';
  };

  const renderAttachmentPreview = (attachment) => {
    if (attachment.type.startsWith('image/')) {
      return (
        <img 
          src={attachment.url} 
          alt={attachment.name}
          style={{
            width: '100%',
            height: '80px',
            objectFit: 'cover',
            borderRadius: '8px'
          }}
        />
      );
    }
    
    return (
      <div style={{
        width: '100%',
        height: '80px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: isDark ? '#27272a' : '#f5f5f4',
        borderRadius: '8px',
        fontSize: '24px'
      }}>
        {getFileIcon(attachment.type)}
      </div>
    );
  };

  return (
    <div style={{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    }}>
      <div style={{
        borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`
      }}>
        <div style={{
          maxWidth: '768px',
          margin: '0 auto',
          padding: '20px'
        }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: '700',
            color: isDark ? '#ffffff' : '#000000',
            marginBottom: '4px'
          }}>Training Journal</h2>
          <p style={{fontSize: '14px', color: isDark ? '#71717a' : '#71717a'}}>
            Track your progress, techniques, and insights
          </p>
        </div>
      </div>
      
      <div style={{
        flex: 1,
        overflowY: 'auto',
        paddingBottom: '200px'
      }}>
        <div style={{
          maxWidth: '768px',
          margin: '0 auto',
          padding: '20px'
        }}>
          {entries.map((entry) => (
            <div key={entry.id} style={{
              marginBottom: '16px',
              padding: '16px',
              borderRadius: '16px',
              backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.9)',
              border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
              boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '12px'
              }}>
                <span style={{fontSize: '12px', fontWeight: '600', color: isDark ? '#a1a1aa' : '#71717a'}}>
                  {entry.date}
                </span>
                <span style={{fontSize: '12px', color: isDark ? '#71717a' : '#a1a1aa'}}>
                  {entry.time}
                </span>
              </div>
              <h3 style={{
                fontSize: '16px',
                fontWeight: '600',
                color: isDark ? '#ffffff' : '#000000',
                marginBottom: '8px'
              }}>{entry.title}</h3>
              <p style={{
                fontSize: '14px',
                lineHeight: '1.5',
                color: isDark ? '#d4d4d8' : '#3f3f46',
                marginBottom: '12px'
              }}>
                {entry.content}
              </p>
              
              {entry.attachments && entry.attachments.length > 0 && (
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
                  gap: '8px',
                  marginBottom: '12px'
                }}>
                  {entry.attachments.map((attachment, i) => (
                    <div key={i} style={{
                      padding: '8px',
                      borderRadius: '8px',
                      backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                      border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`
                    }}>
                      <div style={{
                        fontSize: '16px',
                        textAlign: 'center',
                        marginBottom: '4px'
                      }}>
                        {getFileIcon(attachment.type)}
                      </div>
                      <div style={{
                        fontSize: '10px',
                        color: isDark ? '#a1a1aa' : '#71717a',
                        textAlign: 'center',
                        wordBreak: 'break-word'
                      }}>
                        {attachment.name}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              <div style={{display: 'flex', gap: '8px', flexWrap: 'wrap'}}>
                {entry.tags.map((tag, i) => {
                  const customTag = entry.customTags?.find(ct => ct.name === tag);
                  const colors = getTagColors(tag, customTag?.isPop);
                  return (
                    <span key={i} style={{
                      padding: '4px 10px',
                      borderRadius: '8px',
                      fontSize: '12px',
                      backgroundColor: colors.bg,
                      color: colors.text,
                      fontWeight: '500'
                    }}>{tag}</span>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{
        position: 'fixed',
        bottom: '60px',
        left: '0',
        right: '0',
        padding: '16px',
        backgroundColor: isDark ? 'rgba(0,0,0,0.95)' : 'rgba(245,240,230,0.98)',
        borderTop: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)'
      }}>
        <div style={{
          maxWidth: '768px',
          margin: '0 auto'
        }}>
          <div style={{
            marginBottom: '12px',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '6px',
            alignItems: 'center'
          }}>
            {availableTags.slice(0, 8).map((tag) => {
              const colors = getTagColors(tag);
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleTag(tag)}
                  style={{
                    padding: '4px 8px',
                    borderRadius: '12px',
                    fontSize: '11px',
                    fontWeight: '500',
                    border: 'none',
                    cursor: 'pointer',
                    backgroundColor: selectedTags.includes(tag) ? colors.bg : (isDark ? '#27272a' : '#f5f5f4'),
                    color: selectedTags.includes(tag) ? colors.text : (isDark ? '#a1a1aa' : '#71717a'),
                    transition: 'all 0.2s'
                  }}>
                  {tag}
                </button>
              );
            })}
            
            {!showCustomTag ? (
              <button
                type="button"
                onClick={() => setShowCustomTag(true)}
                style={{
                  padding: '6px 12px',
                  borderRadius: '12px',
                  fontSize: '11px',
                  fontWeight: '500',
                  border: `1px dashed ${isDark ? '#a1a1aa' : '#71717a'}`,
                  cursor: 'pointer',
                  backgroundColor: 'transparent',
                  color: isDark ? '#a1a1aa' : '#71717a',
                  transition: 'all 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                + Add Custom Tag
              </button>
            ) : (
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                padding: '12px',
                borderRadius: '12px',
                backgroundColor: isDark ? '#27272a' : '#ffffff',
                border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
                minWidth: '200px'
              }}>
                <input
                  type="text"
                  placeholder="Enter tag name..."
                  value={customTag}
                  onChange={(e) => setCustomTag(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addCustomTag()}
                  style={{
                    padding: '8px',
                    border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
                    borderRadius: '6px',
                    outline: 'none',
                    fontSize: '12px',
                    backgroundColor: isDark ? '#18181b' : '#f9f9f9',
                    color: isDark ? '#ffffff' : '#000000'
                  }}
                />
                
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '8px'
                }}>
                  <span style={{
                    fontSize: '11px',
                    color: isDark ? '#a1a1aa' : '#71717a',
                    fontWeight: '500'
                  }}>Style:</span>
                  <label style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '11px',
                    color: isDark ? '#ffffff' : '#000000',
                    cursor: 'pointer'
                  }}>
                    <input
                      type="radio"
                      name="tagStyle"
                      checked={!makeCustomPop}
                      onChange={() => setMakeCustomPop(false)}
                      style={{ width: '12px', height: '12px' }}
                    />
                    Normal
                  </label>
                  <label style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '11px',
                    color: '#B08D57',
                    cursor: 'pointer',
                    fontWeight: '600'
                  }}>
                    <input
                      type="radio"
                      name="tagStyle"
                      checked={makeCustomPop}
                      onChange={() => setMakeCustomPop(true)}
                      style={{ width: '12px', height: '12px' }}
                    />
                    ✨ Highlight
                  </label>
                </div>
                
                <div style={{
                  display: 'flex',
                  gap: '6px'
                }}>
                  <button
                    type="button"
                    onClick={addCustomTag}
                    style={{
                      flex: 1,
                      padding: '6px 12px',
                      border: 'none',
                      borderRadius: '6px',
                      fontSize: '11px',
                      backgroundColor: '#18181b',
                      color: '#ffffff',
                      cursor: 'pointer',
                      fontWeight: '500'
                    }}>
                    Add Tag
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowCustomTag(false);
                      setCustomTag('');
                      setMakeCustomPop(false);
                    }}
                    style={{
                      padding: '6px 12px',
                      border: `1px solid ${isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)'}`,
                      borderRadius: '6px',
                      fontSize: '11px',
                      backgroundColor: 'transparent',
                      color: isDark ? '#a1a1aa' : '#71717a',
                      cursor: 'pointer'
                    }}>
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
          
          {attachments.length > 0 && (
            <div style={{
              marginBottom: '12px',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
              gap: '8px'
            }}>
              {attachments.map((attachment) => (
                <div key={attachment.id} style={{
                  position: 'relative',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`
                }}>
                  {renderAttachmentPreview(attachment)}
                  <button
                    type="button"
                    onClick={() => removeAttachment(attachment.id)}
                    style={{
                      position: 'absolute',
                      top: '4px',
                      right: '4px',
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(0,0,0,0.7)',
                      color: '#ffffff',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                    ✕
                  </button>
                  <div style={{
                    position: 'absolute',
                    bottom: '0',
                    left: '0',
                    right: '0',
                    padding: '4px',
                    backgroundColor: 'rgba(0,0,0,0.7)',
                    color: '#ffffff',
                    fontSize: '10px',
                    textAlign: 'center'
                  }}>
                    {attachment.name.length > 15 ? 
                      attachment.name.substring(0, 12) + '...' : 
                      attachment.name
                    }
                  </div>
                </div>
              ))}
            </div>
          )}
          
          <div style={{
            display: 'flex',
            gap: '12px'
          }}>
            <div style={{ flex: 1 }}>
              <textarea
                placeholder="Log today's training... (Ctrl+Enter to save)"
                value={newEntry}
                onChange={(e) => setNewEntry(e.target.value)}
                onKeyPress={handleKeyPress}
                style={{
                  width: '100%',
                  minHeight: '60px',
                  maxHeight: '120px',
                  padding: '12px',
                  borderRadius: '12px',
                  backgroundColor: isDark ? '#27272a' : '#ffffff',
                  color: isDark ? '#ffffff' : '#000000',
                  border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
                  outline: 'none',
                  fontSize: '14px',
                  fontFamily: 'inherit',
                  resize: 'vertical'
                }}
              />
              <div style={{
                display: 'flex',
                gap: '8px',
                marginTop: '8px'
              }}>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  multiple
                  accept="image/*,video/*,.pdf,.doc,.docx"
                  style={{ display: 'none' }}
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  style={{
                    padding: '8px 12px',
                    borderRadius: '8px',
                    backgroundColor: isDark ? '#27272a' : '#f5f5f4',
                    color: isDark ? '#a1a1aa' : '#71717a',
                    border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
                    cursor: 'pointer',
                    fontSize: '12px',
                    fontWeight: '500'
                  }}>
                  📎 Attach
                </button>
              </div>
            </div>
            <button 
              type="button"
              onClick={addEntry}
              style={{
                padding: '12px 24px',
                borderRadius: '12px',
                backgroundColor: '#18181b',
                color: '#ffffff',
                border: 'none',
                cursor: 'pointer',
                fontWeight: 'bold',
                alignSelf: 'flex-start'
              }}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Analytics = ({ isDark, entries, messages, user }) => {
  const getTrainingStats = () => {
    const totalSessions = entries.length;
    const totalMessages = messages.filter(m => m.sender === 'user').length;
    
    const tagCounts = {};
    entries.forEach(entry => {
      entry.tags.forEach(tag => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1;
      });
    });
    
    const topTags = Object.entries(tagCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5);

    const recentEntries = entries.slice(0, 7);
    const consistency = recentEntries.length;
    
    const today = new Date();
    let streak = 0;
    const sortedEntries = [...entries].sort((a, b) => new Date(b.timestamp || Date.now()) - new Date(a.timestamp || Date.now()));
    
    for (let i = 0; i < sortedEntries.length; i++) {
      const entryDate = new Date(sortedEntries[i].timestamp || Date.now());
      const daysDiff = Math.floor((today - entryDate) / (1000 * 60 * 60 * 24));
      if (daysDiff === i) {
        streak++;
      } else {
        break;
      }
    }
    
    return { totalSessions, totalMessages, topTags, consistency, streak };
  };

  const DonutChart = ({ data, size = 120 }) => {
    const radius = size / 2 - 10;
    const center = size / 2;
    const total = data.reduce((sum, item) => sum + item.value, 0);
    
    let currentAngle = -90;
    
    return (
      <svg width={size} height={size}>
        {data.map((item, index) => {
          const percentage = item.value / total;
          const angle = percentage * 360;
          const startAngle = (currentAngle * Math.PI) / 180;
          const endAngle = ((currentAngle + angle) * Math.PI) / 180;
          
          const x1 = center + radius * Math.cos(startAngle);
          const y1 = center + radius * Math.sin(startAngle);
          const x2 = center + radius * Math.cos(endAngle);
          const y2 = center + radius * Math.sin(endAngle);
          
          const largeArcFlag = angle > 180 ? 1 : 0;
          
          const pathData = [
            `M ${center} ${center}`,
            `L ${x1} ${y1}`,
            `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
            'Z'
          ].join(' ');
          
          currentAngle += angle;
          
          const colors = getTagColors(item.name);
          
          return (
            <path
              key={index}
              d={pathData}
              fill={colors.bg}
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="1"
            />
          );
        })}
        <circle
          cx={center}
          cy={center}
          r={radius * 0.6}
          fill={isDark ? '#09090b' : '#f5f0e6'}
          stroke={isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}
          strokeWidth="1"
        />
        <text
          x={center}
          y={center - 5}
          textAnchor="middle"
          fontSize="14"
          fontWeight="600"
          fill={isDark ? '#ffffff' : '#000000'}
        >
          {total}
        </text>
        <text
          x={center}
          y={center + 10}
          textAnchor="middle"
          fontSize="10"
          fill={isDark ? '#a1a1aa' : '#71717a'}
        >
          sessions
        </text>
      </svg>
    );
  };

  const Sparkline = ({ data, width = 100, height = 30 }) => {
    if (data.length < 2) return null;
    
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min || 1;
    
    const points = data.map((value, index) => {
      const x = (index / (data.length - 1)) * width;
      const y = height - ((value - min) / range) * height;
      return `${x},${y}`;
    }).join(' ');
    
    return (
      <svg width={width} height={height}>
        <polyline
          points={points}
          fill="none"
          stroke="#2563eb"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {data.map((value, index) => {
          const x = (index / (data.length - 1)) * width;
          const y = height - ((value - min) / range) * height;
          return (
            <circle
              key={index}
              cx={x}
              cy={y}
              r="2"
              fill="#2563eb"
            />
          );
        })}
      </svg>
    );
  };

  const getFitnessRecommendations = () => {
    const userBelt = user?.belt || 'white';
    const beltLevel = {
      'white': 1,
      'blue': 2, 
      'purple': 3,
      'brown': 4,
      'black': 5
    }[userBelt];

    const recommendations = {
      1: {
        title: "White Belt Foundation",
        cardio: "20-30 min light cardio 3x/week. Focus on building base endurance.",
        strength: "Bodyweight exercises: push-ups, squats, planks. 2-3x/week.",
        bjj: "Focus on basic movements: shrimping, bridging, technical stand-ups.",
        recovery: "Stretch daily, get 7-8 hours sleep. Listen to your body."
      },
      2: {
        title: "Blue Belt Development", 
        cardio: "30-40 min moderate cardio 3-4x/week. Add interval training.",
        strength: "Add weights: deadlifts, squats, pull-ups. 3x/week.",
        bjj: "Drill fundamentals daily. Work on guard retention and escapes.",
        recovery: "Yoga 1x/week, massage monthly. Active recovery days."
      },
      3: {
        title: "Purple Belt Intensity",
        cardio: "40-50 min varied cardio 4x/week. High-intensity intervals.",
        strength: "Compound movements + BJJ-specific exercises. 3-4x/week.",
        bjj: "Advanced drilling, flow rolling, positional sparring daily.",
        recovery: "Mobility work daily, foam rolling, proper nutrition."
      },
      4: {
        title: "Brown Belt Performance",
        cardio: "Competition-level conditioning. Sport-specific protocols.",
        strength: "Periodized strength training with power phases.",
        bjj: "Teaching others, refining personal game, competition prep.",
        recovery: "Professional recovery protocols, stress management."
      },
      5: {
        title: "Black Belt Mastery",
        cardio: "Maintenance and peak performance protocols.",
        strength: "Injury prevention focus, functional strength.",
        bjj: "Leadership, innovation, passing knowledge to others.",
        recovery: "Longevity-focused recovery, joint health priority."
      }
    };

    return recommendations[beltLevel];
  };

  const stats = getTrainingStats();
  const fitnessRec = getFitnessRecommendations();

  return (
    <div style={{
      flex: 1,
      overflowY: 'auto',
      padding: '20px'
    }}>
      <div style={{
        maxWidth: '768px',
        margin: '0 auto'
      }}>
        <h2 style={{
          fontSize: '24px',
          fontWeight: '700',
          color: isDark ? '#ffffff' : '#000000',
          marginBottom: '24px'
        }}>Training Analytics</h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '16px',
          marginBottom: '24px'
        }}>
          <div style={{
            padding: '20px',
            borderRadius: '16px',
            backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.9)',
            border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
            textAlign: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
          }}>
            <div style={{ fontSize: '32px', marginBottom: '8px' }}>🥋</div>
            <div style={{
              fontSize: '28px',
              fontWeight: 'bold',
              color: '#2563eb',
              marginBottom: '4px'
            }}>{stats.totalSessions}</div>
            <div style={{
              fontSize: '12px',
              color: isDark ? '#a1a1aa' : '#71717a',
              fontWeight: '500'
            }}>Training Sessions</div>
          </div>
          
          <div style={{
            padding: '20px',
            borderRadius: '16px',
            backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.9)',
            border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
            textAlign: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
          }}>
            <div style={{ fontSize: '32px', marginBottom: '8px' }}>💬</div>
            <div style={{
              fontSize: '28px',
              fontWeight: 'bold',
              color: '#10b981',
              marginBottom: '4px'
            }}>{stats.totalMessages}</div>
            <div style={{
              fontSize: '12px',
              color: isDark ? '#a1a1aa' : '#71717a',
              fontWeight: '500'
            }}>Coach Interactions</div>
          </div>
          
          <div style={{
            padding: '20px',
            borderRadius: '16px',
            backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.9)',
            border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
            textAlign: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
          }}>
            <div style={{ fontSize: '32px', marginBottom: '8px' }}>📅</div>
            <div style={{
              fontSize: '28px',
              fontWeight: 'bold',
              color: '#f59e0b',
              marginBottom: '4px'
            }}>{stats.consistency}/7</div>
            <div style={{
              fontSize: '12px',
              color: isDark ? '#a1a1aa' : '#71717a',
              fontWeight: '500'
            }}>Week Consistency</div>
          </div>
          
          <div style={{
            padding: '20px',
            borderRadius: '16px',
            backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.9)',
            border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
            textAlign: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
          }}>
            <div style={{ fontSize: '32px', marginBottom: '8px' }}>🔥</div>
            <div style={{
              fontSize: '28px',
              fontWeight: 'bold',
              color: '#dc2626',
              marginBottom: '4px'
            }}>{stats.streak}</div>
            <div style={{
              fontSize: '12px',
              color: isDark ? '#a1a1aa' : '#71717a',
              fontWeight: '500'
            }}>Day Streak</div>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px',
          marginBottom: '24px'
        }}>
          {stats.topTags.length > 0 && (
            <div style={{
              padding: '24px',
              borderRadius: '20px',
              backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.9)',
              border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
              boxShadow: '0 4px 16px rgba(0,0,0,0.06)'
            }}>
              <h3 style={{
                fontSize: '18px',
                fontWeight: '600',
                color: isDark ? '#ffffff' : '#000000',
                marginBottom: '20px'
              }}>Focus Areas</h3>
              
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '24px'
              }}>
                <DonutChart 
                  data={stats.topTags.map(([name, value]) => ({ name, value }))}
                  size={140}
                />
                
                <div style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px'
                }}>
                  {stats.topTags.map(([tag, count], index) => {
                    const colors = getTagColors(tag);
                    return (
                      <div key={tag} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}>
                        <div style={{
                          width: '12px',
                          height: '12px',
                          borderRadius: '50%',
                          backgroundColor: colors.bg
                        }} />
                        <span style={{
                          fontSize: '14px',
                          color: isDark ? '#ffffff' : '#000000',
                          flex: 1
                        }}>{tag}</span>
                        <span style={{
                          fontSize: '12px',
                          color: isDark ? '#a1a1aa' : '#71717a',
                          fontWeight: '600'
                        }}>{count}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
          
          <div style={{
            padding: '24px',
            borderRadius: '20px',
            backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.9)',
            border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
            boxShadow: '0 4px 16px rgba(0,0,0,0.06)'
          }}>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '600',
              color: isDark ? '#ffffff' : '#000000',
              marginBottom: '20px'
            }}>Recent Activity</h3>
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100px'
            }}>
              {entries.length > 1 ? (
                <Sparkline 
                  data={entries.slice(0, 10).reverse().map((_, i) => i + 1)}
                  width={200}
                  height={60}
                />
              ) : (
                <div style={{
                  textAlign: 'center',
                  color: isDark ? '#71717a' : '#a1a1aa',
                  fontSize: '14px'
                }}>
                  Add more entries to see trends
                </div>
              )}
            </div>
          </div>
        </div>

        <div style={{
          padding: '24px',
          borderRadius: '20px',
          backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.9)',
          border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
          boxShadow: '0 4px 16px rgba(0,0,0,0.06)'
        }}>
          <h3 style={{
            fontSize: '20px',
            fontWeight: '600',
            color: isDark ? '#ffffff' : '#000000',
            marginBottom: '20px'
          }}>{fitnessRec.title} - Fitness Plan</h3>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '20px'
          }}>
            <div style={{
              padding: '16px',
              borderRadius: '12px',
              backgroundColor: isDark ? 'rgba(220,38,38,0.1)' : 'rgba(220,38,38,0.05)',
              border: `1px solid rgba(220,38,38,0.2)`
            }}>
              <h4 style={{
                fontSize: '16px',
                fontWeight: '600',
                color: '#dc2626',
                marginBottom: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>🔥 Cardiovascular</h4>
              <p style={{
                fontSize: '14px',
                color: isDark ? '#d4d4d8' : '#3f3f46',
                lineHeight: '1.5'
              }}>{fitnessRec.cardio}</p>
            </div>
            
            <div style={{
              padding: '16px',
              borderRadius: '12px',
              backgroundColor: isDark ? 'rgba(37,99,235,0.1)' : 'rgba(37,99,235,0.05)',
              border: `1px solid rgba(37,99,235,0.2)`
            }}>
              <h4 style={{
                fontSize: '16px',
                fontWeight: '600',
                color: '#2563eb',
                marginBottom: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>💪 Strength Training</h4>
              <p style={{
                fontSize: '14px',
                color: isDark ? '#d4d4d8' : '#3f3f46',
                lineHeight: '1.5'
              }}>{fitnessRec.strength}</p>
            </div>
            
            <div style={{
              padding: '16px',
              borderRadius: '12px',
              backgroundColor: isDark ? 'rgba(16,185,129,0.1)' : 'rgba(16,185,129,0.05)',
              border: `1px solid rgba(16,185,129,0.2)`
            }}>
              <h4 style={{
                fontSize: '16px',
                fontWeight: '600',
                color: '#10b981',
                marginBottom: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>🥋 BJJ Specific</h4>
              <p style={{
                fontSize: '14px',
                color: isDark ? '#d4d4d8' : '#3f3f46',
                lineHeight: '1.5'
              }}>{fitnessRec.bjj}</p>
            </div>
            
            <div style={{
              padding: '16px',
              borderRadius: '12px',
              backgroundColor: isDark ? 'rgba(139,92,246,0.1)' : 'rgba(139,92,246,0.05)',
              border: `1px solid rgba(139,92,246,0.2)`
            }}>
              <h4 style={{
                fontSize: '16px',
                fontWeight: '600',
                color: '#8b5cf6',
                marginBottom: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>🧘 Recovery</h4>
              <p style={{
                fontSize: '14px',
                color: isDark ? '#d4d4d8' : '#3f3f46',
                lineHeight: '1.5'
              }}>{fitnessRec.recovery}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const More = ({ isDark, messages, entries, setMessages, setEntries, user, setUser }) => {
  const getBeltColor = (belt) => {
    const colors = {
      white: '#f8f9fa',
      blue: '#2563eb', 
      purple: '#7c3aed',
      brown: '#92400e',
      black: '#1f2937'
    };
    return colors[belt] || colors.white;
  };

  const [isSigningIn, setIsSigningIn] = useState(false);
  const [signInForm, setSignInForm] = useState({ email: '', password: '' });
  const [signUpForm, setSignUpForm] = useState({ name: '', email: '', password: '', belt: 'white' });
  const [showSignUp, setShowSignUp] = useState(false);

  const handleSignIn = (e) => {
    e.preventDefault();
    setIsSigningIn(true);
    
    setTimeout(() => {
      setUser({
        name: signInForm.email.split('@')[0],
        email: signInForm.email,
        belt: 'blue',
        joinDate: '2023-01-15'
      });
      setIsSigningIn(false);
      setSignInForm({ email: '', password: '' });
    }, 1500);
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    setIsSigningIn(true);
    
    setTimeout(() => {
      setUser({
        name: signUpForm.name,
        email: signUpForm.email,
        belt: signUpForm.belt,
        academyName: 'Local BJJ Academy',
        joinDate: new Date().toISOString().split('T')[0]
      });
      setIsSigningIn(false);
      setSignUpForm({ name: '', email: '', password: '', belt: 'white' });
      setShowSignUp(false);
    }, 1500);
  };

  const handleSignOut = () => {
    if (window.confirm('Are you sure you want to sign out?')) {
      setUser(null);
    }
  };

  const downloadData = () => {
    try {
      const data = {
        messages: messages,
        journal: entries,
        exportDate: new Date().toISOString()
      };
      const blob = new Blob([JSON.stringify(data, null, 2)], {type: 'application/json'});
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'pulse-bjj-data.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
      alert('Download failed. Please try again.');
    }
  };

  const resetApp = () => {
    if (window.confirm('Are you sure? This will clear all messages and journal entries.')) {
      setMessages([{
        sender: 'bot',
        text: "I've been studying your game. What's been giving you the most trouble on the mats lately?",
        timestamp: new Date()
      }]);
      setEntries([{
        id: 1,
        date: 'TODAY',
        time: '2 hours ago',
        title: 'Evening Rolls - Guard Retention',
        content: 'Worked on maintaining frames when opponent stands in closed guard. Key detail: keep elbow connection to knee when they try to break posture...',
        tags: ['Guard', 'Technique']
      }]);
    }
  };

  return (
    <div style={{
      flex: 1,
      overflowY: 'auto',
      padding: '20px'
    }}>
      <div style={{
        maxWidth: '768px',
        margin: '0 auto'
      }}>
        <h2 style={{
          fontSize: '24px',
          fontWeight: '700',
          color: isDark ? '#ffffff' : '#000000',
          marginBottom: '24px'
        }}>Settings & More</h2>
        
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          {user ? (
            <div style={{
              padding: '20px',
              borderRadius: '16px',
              backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
              border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
              textAlign: 'center'
            }}>
              <div style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                backgroundColor: isDark ? '#27272a' : '#f5f5f4',
                margin: '0 auto 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '32px',
                fontWeight: 'bold',
                color: isDark ? '#ffffff' : '#000000'
              }}>
                {user.name.charAt(0).toUpperCase()}
              </div>
              <h3 style={{
                fontSize: '20px',
                fontWeight: '700',
                color: isDark ? '#ffffff' : '#000000',
                marginBottom: '4px'
              }}>{user.name}</h3>
              <p style={{
                fontSize: '14px',
                color: isDark ? '#a1a1aa' : '#71717a',
                marginBottom: '8px'
              }}>{user.email}</p>
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '16px',
                marginBottom: '16px'
              }}>
                <div style={{
                  padding: '6px 12px',
                  borderRadius: '20px',
                  backgroundColor: getBeltColor(user.belt),
                  color: user.belt === 'white' ? '#000000' : '#ffffff',
                  fontSize: '12px',
                  fontWeight: '600',
                  textTransform: 'capitalize'
                }}>
                  {user.belt} Belt
                </div>
                <div style={{
                  padding: '6px 12px',
                  borderRadius: '20px',
                  backgroundColor: isDark ? '#27272a' : '#f5f5f4',
                  color: isDark ? '#ffffff' : '#000000',
                  fontSize: '12px',
                  fontWeight: '500'
                }}>
                  Since {new Date(user.joinDate).getFullYear()}
                </div>
              </div>
              <p style={{
                fontSize: '13px',
                color: isDark ? '#71717a' : '#a1a1aa',
                marginBottom: '16px'
              }}>{user.academyName}</p>
              <button 
                type="button"
                onClick={handleSignOut}
                style={{
                  padding: '10px 20px',
                  borderRadius: '8px',
                  backgroundColor: 'transparent',
                  color: '#dc2626',
                  border: '1px solid #dc2626',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500'
                }}>
                Sign Out
              </button>
            </div>
          ) : (
            <div style={{
              padding: '20px',
              borderRadius: '16px',
              backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)',
              border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`
            }}>
              <h3 style={{
                fontSize: '18px',
                fontWeight: '600',
                color: isDark ? '#ffffff' : '#000000',
                marginBottom: '16px',
                textAlign: 'center'
              }}>
                {showSignUp ? 'Create Account' : 'Sign In'}
              </h3>
              
              {!showSignUp ? (
                <form onSubmit={handleSignIn} style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
                  <input
                    type="email"
                    placeholder="Email"
                    value={signInForm.email}
                    onChange={(e) => setSignInForm(prev => ({...prev, email: e.target.value}))}
                    required
                    style={{
                      padding: '12px',
                      borderRadius: '8px',
                      backgroundColor: isDark ? '#27272a' : '#ffffff',
                      color: isDark ? '#ffffff' : '#000000',
                      border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
                      outline: 'none',
                      fontSize: '14px'
                    }}
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    value={signInForm.password}
                    onChange={(e) => setSignInForm(prev => ({...prev, password: e.target.value}))}
                    required
                    style={{
                      padding: '12px',
                      borderRadius: '8px',
                      backgroundColor: isDark ? '#27272a' : '#ffffff',
                      color: isDark ? '#ffffff' : '#000000',
                      border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
                      outline: 'none',
                      fontSize: '14px'
                    }}
                  />
                  <button 
                    type="submit"
                    disabled={isSigningIn}
                    style={{
                      padding: '12px',
                      borderRadius: '8px',
                      backgroundColor: '#18181b',
                      color: '#ffffff',
                      border: 'none',
                      cursor: isSigningIn ? 'not-allowed' : 'pointer',
                      fontSize: '14px',
                      fontWeight: '600',
                      opacity: isSigningIn ? 0.7 : 1
                    }}>
                    {isSigningIn ? 'Signing In...' : 'Sign In'}
                  </button>
                  <button 
                    type="button"
                    onClick={() => setShowSignUp(true)}
                    style={{
                      padding: '8px',
                      borderRadius: '6px',
                      backgroundColor: 'transparent',
                      color: isDark ? '#a1a1aa' : '#71717a',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '13px',
                      textDecoration: 'underline'
                    }}>
                    Don't have an account? Sign up
                  </button>
                </form>
              ) : (
                <form onSubmit={handleSignUp} style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={signUpForm.name}
                    onChange={(e) => setSignUpForm(prev => ({...prev, name: e.target.value}))}
                    required
                    style={{
                      padding: '12px',
                      borderRadius: '8px',
                      backgroundColor: isDark ? '#27272a' : '#ffffff',
                      color: isDark ? '#ffffff' : '#000000',
                      border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
                      outline: 'none',
                      fontSize: '14px'
                    }}
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={signUpForm.email}
                    onChange={(e) => setSignUpForm(prev => ({...prev, email: e.target.value}))}
                    required
                    style={{
                      padding: '12px',
                      borderRadius: '8px',
                      backgroundColor: isDark ? '#27272a' : '#ffffff',
                      color: isDark ? '#ffffff' : '#000000',
                      border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
                      outline: 'none',
                      fontSize: '14px'
                    }}
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    value={signUpForm.password}
                    onChange={(e) => setSignUpForm(prev => ({...prev, password: e.target.value}))}
                    required
                    style={{
                      padding: '12px',
                      borderRadius: '8px',
                      backgroundColor: isDark ? '#27272a' : '#ffffff',
                      color: isDark ? '#ffffff' : '#000000',
                      border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
                      outline: 'none',
                      fontSize: '14px'
                    }}
                  />
                  <select
                    value={signUpForm.belt}
                    onChange={(e) => setSignUpForm(prev => ({...prev, belt: e.target.value}))}
                    style={{
                      padding: '12px',
                      borderRadius: '8px',
                      backgroundColor: isDark ? '#27272a' : '#ffffff',
                      color: isDark ? '#ffffff' : '#000000',
                      border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
                      outline: 'none',
                      fontSize: '14px'
                    }}>
                    <option value="white">White Belt</option>
                    <option value="blue">Blue Belt</option>
                    <option value="purple">Purple Belt</option>
                    <option value="brown">Brown Belt</option>
                    <option value="black">Black Belt</option>
                  </select>
                  <button 
                    type="submit"
                    disabled={isSigningIn}
                    style={{
                      padding: '12px',
                      borderRadius: '8px',
                      backgroundColor: '#18181b',
                      color: '#ffffff',
                      border: 'none',
                      cursor: isSigningIn ? 'not-allowed' : 'pointer',
                      fontSize: '14px',
                      fontWeight: '600',
                      opacity: isSigningIn ? 0.7 : 1
                    }}>
                    {isSigningIn ? 'Creating Account...' : 'Create Account'}
                  </button>
                  <button 
                    type="button"
                    onClick={() => setShowSignUp(false)}
                    style={{
                      padding: '8px',
                      borderRadius: '6px',
                      backgroundColor: 'transparent',
                      color: isDark ? '#a1a1aa' : '#71717a',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '13px',
                      textDecoration: 'underline'
                    }}>
                    Already have an account? Sign in
                  </button>
                </form>
              )}
            </div>
          )}

          <div style={{
            padding: '16px',
            borderRadius: '12px',
            backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)',
            border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`
          }}>
            <h3 style={{
              fontSize: '16px',
              fontWeight: '600',
              color: isDark ? '#ffffff' : '#000000',
              marginBottom: '8px'
            }}>About PULSE BJJ</h3>
            <p style={{
              fontSize: '14px',
              color: isDark ? '#a1a1aa' : '#71717a',
              lineHeight: '1.5'
            }}>
              Your AI-powered Brazilian Jiu-Jitsu coach. Get personalized training advice, track your progress, and improve your game.
            </p>
          </div>

          <div style={{
            padding: '16px',
            borderRadius: '12px',
            backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)',
            border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`
          }}>
            <h3 style={{
              fontSize: '16px',
              fontWeight: '600',
              color: isDark ? '#ffffff' : '#000000',
              marginBottom: '8px'
            }}>Export Data</h3>
            <button 
              type="button"
              onClick={downloadData}
              style={{
                padding: '10px 16px',
                borderRadius: '8px',
                backgroundColor: '#18181b',
                color: '#ffffff',
                border: 'none',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500'
              }}>
              Download Training Data
            </button>
          </div>

          <div style={{
            padding: '16px',
            borderRadius: '12px',
            backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)',
            border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`
          }}>
            <h3 style={{
              fontSize: '16px',
              fontWeight: '600',
              color: isDark ? '#ffffff' : '#000000',
              marginBottom: '8px'
            }}>Clear Data</h3>
            <button 
              type="button"
              onClick={resetApp}
              style={{
                padding: '10px 16px',
                borderRadius: '8px',
                backgroundColor: '#dc2626',
                color: '#ffffff',
                border: 'none',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500'
              }}>
              Reset App
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const BottomNav = ({ activeTab, setActiveTab, isDark }) => {
  const tabs = [
    { id: 'chat', label: 'Chat', icon: 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z' },
    { id: 'journal', label: 'Journal', icon: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8' },
    { id: 'analytics', label: 'Analytics', icon: 'M3 3v18h18 M7 12l4-4 4 4 4-4' },
    { id: 'more', label: 'More', icon: 'M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0 M12 5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0 M12 19m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0' }
  ];

  return (
    <nav style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: isDark ? 'rgba(0,0,0,0.95)' : 'rgba(245,240,230,0.98)',
      borderTop: isDark ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(0,0,0,0.06)',
      zIndex: 100
    }}>
      <div style={{
        maxWidth: '768px',
        margin: '0 auto',
        padding: '8px 0'
      }}>
        <div style={{display: 'flex', justifyContent: 'center', gap: '4px'}}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setActiveTab(tab.id);
              }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '8px 20px',
                borderRadius: '12px',
                backgroundColor: activeTab === tab.id ? (isDark ? '#27272a' : '#18181b') : 'transparent',
                color: activeTab === tab.id ? (isDark ? '#ffffff' : '#ffffff') : (isDark ? '#71717a' : '#71717a'),
                cursor: 'pointer',
                border: 'none',
                transition: 'all 0.2s'
              }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d={tab.icon} />
              </svg>
              <span style={{fontSize: '11px', fontWeight: '500', marginTop: '4px'}}>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

const App = () => {
  const [isDark, setIsDark] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: "I've been studying your game. What's been giving you the most trouble on the mats lately?",
      timestamp: new Date()
    }
  ]);
  const [entries, setEntries] = useState([
    {
      id: 1,
      date: 'TODAY',
      time: '2 hours ago',
      title: 'Evening Rolls - Guard Retention',
      content: 'Worked on maintaining frames when opponent stands in closed guard. Key detail: keep elbow connection to knee when they try to break posture...',
      tags: ['Guard', 'Technique']
    }
  ]);
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('chat');
  const recognitionRef = useRef(null);

  const toggleDarkMode = () => {
    setIsDark(prev => !prev);
  };

  const getBJJResponse = (userInput, journalEntries = []) => {
    const input = userInput.toLowerCase();
    
    const recentEntries = journalEntries.slice(0, 5);
    const userFocusAreas = [];
    const userChallenges = [];
    
    recentEntries.forEach(entry => {
      const content = entry.content.toLowerCase();
      if (content.includes('struggled') || content.includes('difficult') || content.includes('need to work on')) {
        userChallenges.push(entry.title);
      }
      userFocusAreas.push(...entry.tags);
    });
    
    const commonFocus = [...new Set(userFocusAreas)].slice(0, 3);
    
    // Specific technique responses
    if (input.includes('warm') || input.includes('routine')) {
      const baseResponse = 'Essential BJJ warm-up: Start with joint rotations (neck, shoulders, hips), then shrimping and bridging movements.';
      const tip = 'Add 5 minutes of light flow rolling at the end - it bridges the gap between warm-up and live training.';
      const checkIn = 'What does your current warm-up routine look like?';
      return `${baseResponse} ${tip}\n\n${checkIn}`;
    }
    
    if (input.includes('side control') || input.includes('escape side')) {
      const hasWorkedOnSideControl = commonFocus.includes('Side Control');
      const baseResponse = 'To escape side control: protect your neck, create frames, bridge to make space, then shrimp away.';
      const tip = hasWorkedOnSideControl ? 
        'Since you\'ve been working on this, focus on timing - bridge when they shift weight forward.' :
        'Key detail: never turn away from your opponent - always face them during the escape.';
      const checkIn = 'Which part of the side control escape gives you the most trouble?';
      
      return `${baseResponse} ${tip}\n\n${checkIn}`;
    }
    
    if (input.includes('guard') && (input.includes('retention') || input.includes('keep') || input.includes('maintain') || input.includes('passing'))) {
      const hasGuardWork = commonFocus.includes('Guard');
      if (input.includes('passing')) {
        const baseResponse = 'Guard passing fundamentals: control the hips first, maintain good posture, and chain your passes together.';
        const tip = 'If one pass fails, immediately transition to another - never force a single technique.';
        const checkIn = 'What\'s your go-to guard pass when you get stuck?';
        return `${baseResponse} ${tip}\n\n${checkIn}`;
      } else {
        const baseResponse = 'Guard retention: use active feet on their hips to control distance, and strong grips to break their posture.';
        const tip = hasGuardWork ?
          'I see you\'ve been working on guard - try mixing closed guard with open guard transitions.' :
          'Remember: movement is key - static guard gets passed, active guard stays strong.';
        const checkIn = 'Which guard position feels most natural to you right now?';
        
        return `${baseResponse} ${tip}\n\n${checkIn}`;
      }
    }
    
    if (input.includes('competition') || input.includes('compete')) {
      const hasCompExp = commonFocus.includes('Competition');
      const baseResponse = 'Competition preparation: drill your A-game positions until they\'re automatic under pressure.';
      const tip = hasCompExp ?
        'Since you compete, add specific drilling with tired muscles - that\'s when tournaments get won.' :
        'Start with local tournaments to get comfortable with the competition environment.';
      const checkIn = 'What aspects of competing make you most nervous?';
      
      return `${baseResponse} ${tip}\n\n${checkIn}`;
    }
    
    if (input.includes('submission') && input.includes('defense')) {
      const baseResponse = 'Submission defense: recognize the setup early, create frames immediately, and stay calm under pressure.';
      const tip = 'Better to give up position than get submitted - escaping side control is easier than escaping a tight choke.';
      const checkIn = 'Which submissions catch you most often?';
      return `${baseResponse} ${tip}\n\n${checkIn}`;
    }
    
    // Context-aware general responses
    const generalResponses = [
      {
        response: 'Focus on fundamental movements: shrimping, bridging, and technical stand-ups form the foundation.',
        tip: commonFocus.length > 0 ? 
          `I notice you\'ve been working on ${commonFocus[0]} - these fundamentals will directly improve that area.` :
          'These basics appear in every position - master them and everything else gets easier.',
        checkIn: 'Which fundamental movement feels most challenging for you?'
      },
      {
        response: 'Consistency beats intensity in BJJ development.',
        tip: recentEntries.length > 2 ?
          'I can see you\'re staying consistent with your training - that\'s exactly how skills develop.' :
          'Regular training 3-4 times per week builds muscle memory better than occasional intense sessions.',
        checkIn: 'How has your training schedule been feeling lately?'
      },
      {
        response: 'Position before submission - control the position first, then hunt for the finish.',
        tip: userChallenges.length > 0 ?
          'This principle will help with the challenges you\'ve noted in your training journal.' :
          'Rushing to submissions from weak positions usually ends in escapes or reversals.',
        checkIn: 'Are you finding yourself rushing to submissions lately?'
      }
    ];
    
    const selected = generalResponses[Math.floor(Math.random() * generalResponses.length)];
    return `${selected.response} ${selected.tip}\n\n${selected.checkIn}`;
  };

  const handleSubmit = (e, customInput = null) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    const textToSend = customInput || input;
    if (!textToSend.trim()) return;
    
    const newMessage = { sender: 'user', text: textToSend, timestamp: new Date() };
    setMessages(prev => [...prev, newMessage]);
    setInput('');
    setIsTyping(true);
    
    setTimeout(() => {
      const aiResponse = getBJJResponse(textToSend, entries);
      
      setIsTyping(false);
      setMessages(prev => [...prev, { 
        sender: 'bot', 
        text: aiResponse,
        timestamp: new Date()
      }]);
    }, 1000 + Math.random() * 2000);
  };

  const handleVoiceToggle = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      alert('Speech recognition is not supported in your browser. Try Chrome or Safari.');
      return;
    }

    if (isRecording) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsRecording(false);
    } else {
      try {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognitionRef.current = recognition;
        
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';
        
        recognition.onresult = (event) => {
          const transcript = event.results[0][0].transcript;
          setInput(transcript);
          setIsRecording(false);
        };
        
        recognition.onerror = (event) => {
          console.error('Speech recognition error:', event.error);
          setIsRecording(false);
          if (event.error === 'not-allowed') {
            alert('Microphone access denied. Please allow microphone access and try again.');
          }
        };
        
        recognition.onend = () => {
          setIsRecording(false);
        };
        
        recognition.start();
        setIsRecording(true);
      } catch (error) {
        console.error('Voice recognition failed:', error);
        alert('Voice recognition failed. Please try again.');
      }
    }
  };

  const handleQuickPrompt = (prompt) => {
    handleSubmit(null, prompt);
  };

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes bounce {
        0%, 80%, 100% {
          transform: scale(1);
          opacity: 0.5;
        }
        40% {
          transform: scale(1.3);
          opacity: 1;
        }
      }
      @keyframes pulse {
        0% {
          box-shadow: 0 0 0 0 rgba(220, 38, 38, 0.7);
        }
        70% {
          box-shadow: 0 0 0 10px rgba(220, 38, 38, 0);
        }
        100% {
          box-shadow: 0 0 0 0 rgba(220, 38, 38, 0);
        }
      }
    `;
    document.head.appendChild(style);
    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, []);

  return (
    <div style={{
      height: '100vh',
      width: '100vw',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: isDark ? '#09090b' : '#f5f0e6',
      position: 'relative',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      overflow: 'hidden'
    }}>
      <div style={{
        position: 'absolute',
        inset: 0,
        opacity: isDark ? 0.02 : 0.015,
        backgroundImage: 'url("data:image/svg+xml,%3Csvg width="100" height="100" xmlns="http://www.w3.org/2000/svg"%3E%3Cdefs%3E%3Cfilter id="noise"%3E%3CfeTurbulence baseFrequency="0.9" /%3E%3C/filter%3E%3C/defs%3E%3Crect width="100" height="100" filter="url(%23noise)" opacity="0.5" /%3E%3C/svg%3E")',
        pointerEvents: 'none'
      }} />

      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <Header isDark={isDark} toggleDarkMode={toggleDarkMode} />
        
        {activeTab === 'chat' && (
          <>
            <ChatLog messages={messages} isTyping={isTyping} isDark={isDark} onQuickPrompt={handleQuickPrompt} />
            <Composer 
              input={input} 
              setInput={setInput} 
              onSubmit={handleSubmit} 
              isDark={isDark}
              isRecording={isRecording}
              onVoiceToggle={handleVoiceToggle}
            />
          </>
        )}
        
        {activeTab === 'journal' && (
          <Journal isDark={isDark} entries={entries} setEntries={setEntries} />
        )}
        
        {activeTab === 'analytics' && (
          <Analytics isDark={isDark} entries={entries} messages={messages} user={user} />
        )}
        
        {activeTab === 'more' && (
          <More 
            isDark={isDark} 
            messages={messages} 
            entries={entries} 
            setMessages={setMessages}
            setEntries={setEntries}
            user={user}
            setUser={setUser}
          />
        )}
      </div>

      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} isDark={isDark} />
    </div>
  );
};

export default App;