import React, { useState, useEffect, useRef } from 'react';

const Header = ({ isDark, toggleDarkMode }) => {
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
          onClick={toggleDarkMode} 
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
          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
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

const ChatLog = ({ messages, isTyping, isDark }) => {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
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
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
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
                maxWidth: '85%',
                '@media (min-width: 768px)': { maxWidth: '70%' }
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

const QuickPrompts = ({ onSelectPrompt, isDark }) => {
  const prompts = [
    "How do I escape side control?",
    "Best warm-up routine for BJJ?",
    "Tips for my first competition?",
    "How to improve my guard passing?",
    "Submission defense fundamentals?",
    "Conditioning exercises for BJJ?",
    "How to develop better grips?",
    "Mental preparation strategies?"
  ];

  return (
    <div style={{
      position: 'absolute',
      bottom: '60px',
      left: '12px',
      backgroundColor: isDark ? 'rgba(0,0,0,0.95)' : 'rgba(255,255,255,0.98)',
      border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
      borderRadius: '12px',
      padding: '8px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      maxHeight: '300px',
      overflowY: 'auto',
      zIndex: 1000,
      minWidth: '250px'
    }}>
      {prompts.map((prompt, i) => (
        <button
          key={i}
          onClick={() => onSelectPrompt(prompt)}
          style={{
            display: 'block',
            width: '100%',
            padding: '10px 12px',
            textAlign: 'left',
            backgroundColor: 'transparent',
            border: 'none',
            borderRadius: '8px',
            color: isDark ? '#ffffff' : '#000000',
            fontSize: '14px',
            cursor: 'pointer',
            transition: 'background-color 0.2s'
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
        >
          {prompt}
        </button>
      ))}
    </div>
  );
};

const Composer = ({ input, setInput, onSubmit, isDark, isRecording, onVoiceToggle, onQuickPromptsToggle, showQuickPrompts }) => {
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
        <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
          <button 
            onClick={onQuickPromptsToggle}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: showQuickPrompts ? '#18181b' : (isDark ? '#27272a' : '#ffffff'),
              border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
              cursor: 'pointer',
              flexShrink: 0,
              transition: 'all 0.2s'
            }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" 
                 style={{color: showQuickPrompts ? '#ffffff' : (isDark ? '#a1a1aa' : '#71717a')}}>
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 8v8"/>
              <path d="M8 12h8"/>
            </svg>
          </button>
          <button 
            onClick={onVoiceToggle}
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
            onKeyPress={(e) => e.key === 'Enter' && onSubmit(e)}
            disabled={isRecording}
          />
          <button 
            onClick={onSubmit}
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
        </div>
      </div>
    </div>
  );
};

const Journal = ({ isDark }) => {
  const [entries, setEntries] = useState(() => {
    const saved = localStorage.getItem('journalEntries');
    return saved ? JSON.parse(saved) : [
      {
        id: 1,
        date: 'TODAY',
        time: '2 hours ago',
        title: 'Evening Rolls - Guard Retention',
        content: 'Worked on maintaining frames when opponent stands in closed guard. Key detail: keep elbow connection to knee when they try to break posture...',
        tags: ['Guard', 'Technique']
      }
    ];
  });
  const [newEntry, setNewEntry] = useState('');

  const addEntry = () => {
    if (!newEntry.trim()) return;
    
    const entry = {
      id: Date.now(),
      date: 'TODAY',
      time: 'Just now',
      title: newEntry.split('\n')[0].substring(0, 50),
      content: newEntry,
      tags: ['Training']
    };
    
    const updated = [entry, ...entries];
    setEntries(updated);
    localStorage.setItem('journalEntries', JSON.stringify(updated));
    setNewEntry('');
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
        paddingBottom: '180px'
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
              <div style={{display: 'flex', gap: '8px', flexWrap: 'wrap'}}>
                {entry.tags.map((tag, i) => (
                  <span key={i} style={{
                    padding: '4px 10px',
                    borderRadius: '8px',
                    fontSize: '12px',
                    backgroundColor: 'rgba(59,130,246,0.1)',
                    color: '#2563eb'
                  }}>{tag}</span>
                ))}
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
          margin: '0 auto',
          display: 'flex',
          gap: '12px'
        }}>
          <textarea
            placeholder="Log today's training..."
            value={newEntry}
            onChange={(e) => setNewEntry(e.target.value)}
            style={{
              flex: 1,
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
          <button 
            onClick={addEntry}
            style={{
              padding: '12px 24px',
              borderRadius: '12px',
              backgroundColor: '#18181b',
              color: '#ffffff',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 'bold',
              alignSelf: 'flex-end'
            }}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

const More = ({ isDark }) => {
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
              onClick={() => {
                const data = {
                  messages: localStorage.getItem('chatMessages') || '[]',
                  journal: localStorage.getItem('journalEntries') || '[]'
                };
                const blob = new Blob([JSON.stringify(data, null, 2)], {type: 'application/json'});
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'pulse-bjj-data.json';
                a.click();
              }}
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
              onClick={() => {
                if (confirm('Are you sure? This will clear all messages and journal entries.')) {
                  localStorage.clear();
                  window.location.reload();
                }
              }}
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
              onClick={() => setActiveTab(tab.id)}
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
  const [showQuickPrompts, setShowQuickPrompts] = useState(false);
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('chatMessages');
    return saved ? JSON.parse(saved) : [
      {
        sender: 'bot',
        text: "I've been studying your game. What's been giving you the most trouble on the mats lately?",
        timestamp: new Date()
      }
    ];
  });
  const [activeTab, setActiveTab] = useState('chat');
  const recognitionRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(messages));
  }, [messages]);

  const toggleDarkMode = () => {
    setIsDark(prev => !prev);
  };

  const handleSubmit = async (e, customInput = null) => {
    e?.preventDefault?.();
    const textToSend = customInput || input;
    if (!textToSend.trim()) return;
    
    const newMessage = { sender: 'user', text: textToSend, timestamp: new Date() };
    setMessages(prev => [...prev, newMessage]);
    setInput('');
    setShowQuickPrompts(false);
    setIsTyping(true);
    
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content: 'You are an expert BJJ coach. Provide helpful, specific training advice. Be concise but detailed. Use BJJ terminology naturally. Keep responses under 3 paragraphs.'
            },
            { role: 'user', content: textToSend }
          ],
          temperature: 0.7,
          max_tokens: 300
        })
      });
      
      const data = await response.json();
      const aiResponse = data.choices[0].message.content;
      
      setIsTyping(false);
      setMessages(prev => [...prev, { 
        sender: 'bot', 
        text: aiResponse,
        timestamp: new Date()
      }]);
    } catch (error) {
      console.error('Error:', error);
      setIsTyping(false);
      // Fallback to hardcoded response if API fails
      const responses = {
        'side control': 'To escape side control, first protect your neck and create frames with your arms. Bridge to create space, then shrimp away while bringing your knee in to recover guard. Focus on timing your bridge when they shift weight forward.',
        'guard': 'For guard retention, control the distance with your feet on their hips. Use grips on sleeves or collar to break their posture. If they stand, transition to open guard variations like De La Riva or Spider guard.',
        'armbar': 'From closed guard armbar: Control their posture, secure the arm, pivot your hips perpendicular to theirs. Squeeze knees together, control the wrist, and extend your hips while pulling the arm down.',
        'default': 'Focus on fundamental movements: shrimping, bridging, and technical stand-ups. These form the foundation of all BJJ techniques. Drill these daily before class.'
      };
      
      const topic = Object.keys(responses).find(key => textToSend.toLowerCase().includes(key)) || 'default';
      setMessages(prev => [...prev, { 
        sender: 'bot', 
        text: responses[topic],
        timestamp: new Date()
      }]);
    }
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
      };
      
      recognition.onend = () => {
        setIsRecording(false);
      };
      
      recognition.start();
      setIsRecording(true);
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
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      body {
        margin: 0;
        padding: 0;
        overflow: hidden;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
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
            <ChatLog messages={messages} isTyping={isTyping} isDark={isDark} />
            <Composer 
              input={input} 
              setInput={setInput} 
              onSubmit={handleSubmit} 
              isDark={isDark}
              isRecording={isRecording}
              onVoiceToggle={handleVoiceToggle}
              onQuickPromptsToggle={() => setShowQuickPrompts(!showQuickPrompts)}
              showQuickPrompts={showQuickPrompts}
            />
            {showQuickPrompts && (
              <QuickPrompts 
                onSelectPrompt={handleQuickPrompt}
                isDark={isDark}
              />
            )}
          </>
        )}
        
        {activeTab === 'journal' && <Journal isDark={isDark} />}
        {activeTab === 'more' && <More isDark={isDark} />}
      </div>

      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} isDark={isDark} />
    </div>
  );
};

export default App;