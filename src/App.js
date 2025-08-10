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

const Composer = ({ input, setInput, onSubmit, isDark }) => {
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
        padding: '16px 20px'
      }}>
        <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
          <button 
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: isDark ? '#27272a' : '#ffffff',
              border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
              cursor: 'pointer',
              flexShrink: 0
            }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{color: isDark ? '#a1a1aa' : '#71717a'}}>
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 8v8"/>
              <path d="M8 12h8"/>
            </svg>
          </button>
          <button 
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: isDark ? '#27272a' : '#ffffff',
              border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
              cursor: 'pointer',
              flexShrink: 0
            }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{color: isDark ? '#a1a1aa' : '#71717a'}}>
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
            placeholder="Ask about techniques, strategy, or get personalized advice..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && onSubmit(e)}
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
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: "I've been studying your game. What's been giving you the most trouble on the mats lately?",
      timestamp: new Date()
    }
  ]);
  const [activeTab, setActiveTab] = useState('chat');

  const toggleDarkMode = () => {
    setIsDark(prev => !prev);
  };

  const getBJJResponse = (input) => {
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes('armbar') || lowerInput.includes('arm bar')) {
      return "Armbars from side control - excellent choice! The key is controlling their near arm first.\n\n1. Secure the far arm by threading your arm under their far armpit\n2. Step over their head with your near leg\n3. Pivot and sit back while controlling the wrist\n\nWant me to break down the grip details or the finishing mechanics?";
    } else if (lowerInput.includes('side control')) {
      return "Side control attacks - great position to work from!\n\nFrom here you have several options:\n- Armbar (far or near arm)\n- Kimura on the far arm\n- Transition to mount or north-south\n\nWhich attack gives you the most trouble to finish?";
    } else if (lowerInput.includes('guard')) {
      return "Guard work - smart focus!\n\nWhat's been your biggest issue? People smashing through with pressure, or speed-passing around your legs?";
    } else if (lowerInput.includes('test')) {
      return "Testing your game is crucial. Let's work on something specific - what position or technique do you want to drill?";
    } else {
      const responses = [
        "Interesting! Tell me more about what you're working on specifically.",
        "Let's dig deeper into that. What position are you starting from?",
        "Good question! Are you having trouble with the setup or the finish?"
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }
  };

  const handleSubmit = async (e) => {
    e?.preventDefault?.();
    if (!input.trim()) return;
    
    const newMessage = { sender: 'user', text: input, timestamp: new Date() };
    setMessages(prev => [...prev, newMessage]);
    const userInput = input;
    setInput('');
    setIsTyping(true);
    
    setTimeout(() => {
      const response = getBJJResponse(userInput);
      setIsTyping(false);
      setMessages(prev => [...prev, { 
        sender: 'bot', 
        text: response,
        timestamp: new Date()
      }]);
    }, 1500);
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
      {/* Background texture */}
      <div style={{
        position: 'absolute',
        inset: 0,
        opacity: isDark ? 0.02 : 0.015,
        backgroundImage: 'url("data:image/svg+xml,%3Csvg width="100" height="100" xmlns="http://www.w3.org/2000/svg"%3E%3Cdefs%3E%3Cfilter id="noise"%3E%3CfeTurbulence baseFrequency="0.9" /%3E%3C/filter%3E%3C/defs%3E%3Crect width="100" height="100" filter="url(%23noise)" opacity="0.5" /%3E%3C/svg%3E")',
        pointerEvents: 'none'
      }} />

      {/* Main content area */}
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
            <Composer input={input} setInput={setInput} onSubmit={handleSubmit} isDark={isDark} />
          </>
        )}
        
        {activeTab === 'journal' && (
          <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
          }}>
            {/* Journal Header */}
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
            
            {/* Journal content */}
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
                {/* Today's Entry */}
                <div style={{
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
                      TODAY
                    </span>
                    <span style={{fontSize: '12px', color: isDark ? '#71717a' : '#a1a1aa'}}>
                      2 hours ago
                    </span>
                  </div>
                  <h3 style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    color: isDark ? '#ffffff' : '#000000',
                    marginBottom: '8px'
                  }}>Evening Rolls - Guard Retention</h3>
                  <p style={{
                    fontSize: '14px',
                    lineHeight: '1.5',
                    color: isDark ? '#d4d4d8' : '#3f3f46',
                    marginBottom: '12px'
                  }}>
                    Worked on maintaining frames when opponent stands in closed guard. Key detail: keep elbow connection to knee when they try to break posture...
                  </p>
                  <div style={{display: 'flex', gap: '8px', flexWrap: 'wrap'}}>
                    <span style={{
                      padding: '4px 10px',
                      borderRadius: '8px',
                      fontSize: '12px',
                      backgroundColor: 'rgba(59,130,246,0.1)',
                      color: '#2563eb'
                    }}>Guard</span>
                    <span style={{
                      padding: '4px 10px',
                      borderRadius: '8px',
                      fontSize: '12px',
                      backgroundColor: 'rgba(34,197,94,0.1)',
                      color: '#16a34a'
                    }}>Technique</span>
                  </div>
                </div>

                {/* Yesterday's Entry with Media */}
                <div style={{
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
                      YESTERDAY
                    </span>
                    <span style={{fontSize: '12px', color: isDark ? '#71717a' : '#a1a1aa'}}>
                      8:30 PM
                    </span>
                  </div>
                  <h3 style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    color: isDark ? '#ffffff' : '#000000',
                    marginBottom: '8px'
                  }}>Competition Training</h3>
                  <p style={{
                    fontSize: '14px',
                    lineHeight: '1.5',
                    color: isDark ? '#d4d4d8' : '#3f3f46',
                    marginBottom: '12px'
                  }}>
                    5-minute rounds with 30 second breaks. Focused on cardio and maintaining top pressure...
                  </p>
                  
                  {/* Media Attachments */}
                  <div style={{display: 'flex', gap: '8px', marginBottom: '12px', flexWrap: 'wrap'}}>
                    <div style={{
                      width: '80px',
                      height: '80px',
                      borderRadius: '8px',
                      backgroundColor: isDark ? '#27272a' : '#f5f5f4',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer'
                    }}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{color: isDark ? '#71717a' : '#a1a1aa'}}>
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                        <circle cx="8.5" cy="8.5" r="1.5"/>
                        <polyline points="21 15 16 10 5 21"/>
                      </svg>
                    </div>
                    <div style={{
                      width: '80px',
                      height: '80px',
                      borderRadius: '8px',
                      backgroundColor: isDark ? '#27272a' : '#f5f5f4',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer'
                    }}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{color: isDark ? '#71717a' : '#a1a1aa'}}>
                        <polygon points="23 7 16 12 23 17 23 7"/>
                        <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
                      </svg>
                    </div>
                  </div>
                  
                  <div style={{display: 'flex', gap: '8px', flexWrap: 'wrap'}}>
                    <span style={{
                      padding: '4px 10px',
                      borderRadius: '8px',
                      fontSize: '12px',
                      backgroundColor: 'rgba(239,68,68,0.1)',
                      color: '#dc2626'
                    }}>Competition</span>
                    <span style={{
                      padding: '4px 10px',
                      borderRadius: '8px',
                      fontSize: '12px',
                      backgroundColor: 'rgba(168,85,247,0.1)',
                      color: '#9333ea'
                    }}>Cardio</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Journal input - Full featured */}
            <div style={{
              position: 'fixed',
              bottom: '60px',
              left: 0,
              right: 0,
              backgroundColor: isDark ? 'rgba(0,0,0,0.95)' : 'rgba(245,240,230,0.98)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              borderTop: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
              boxShadow: '0 -4px 12px rgba(0,0,0,0.05)'
            }}>
              <div style={{
                maxWidth: '768px',
                margin: '0 auto',
                padding: '16px 20px'
              }}>
                <div style={{display: 'flex', gap: '12px', alignItems: 'center'}}>
                  {/* Photo Upload */}
                  <button style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '12px',
                    backgroundColor: isDark ? '#27272a' : '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
                    cursor: 'pointer',
                    flexShrink: 0
                  }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{color: isDark ? '#a1a1aa' : '#71717a'}}>
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                      <circle cx="8.5" cy="8.5" r="1.5"/>
                      <polyline points="21 15 16 10 5 21"/>
                    </svg>
                  </button>
                  
                  {/* Video Upload */}
                  <button style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '12px',
                    backgroundColor: isDark ? '#27272a' : '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
                    cursor: 'pointer',
                    flexShrink: 0
                  }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{color: isDark ? '#a1a1aa' : '#71717a'}}>
                      <polygon points="23 7 16 12 23 17 23 7"/>
                      <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
                    </svg>
                  </button>
                  
                  {/* Text Input */}
                  <input
                    placeholder="Log today's training..."
                    style={{
                      flex: 1,
                      height: '40px',
                      padding: '0 12px',
                      borderRadius: '12px',
                      backgroundColor: isDark ? '#27272a' : '#ffffff',
                      color: isDark ? '#ffffff' : '#000000',
                      border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
                      outline: 'none',
                      fontSize: '14px',
                      fontFamily: 'inherit'
                    }}
                  />
                  
                  {/* Submit Button */}
                  <button style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '12px',
                    backgroundColor: '#18181b',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: 'none',
                    cursor: 'pointer',
                    flexShrink: 0
                  }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <line x1="12" y1="5" x2="12" y2="19"/>
                      <polyline points="19 12 12 19 5 12"/>
                    </svg>
                  </button>
                </div>
                
                {/* Quick Tags */}
                <div style={{
                  display: 'flex',
                  gap: '8px',
                  marginTop: '12px',
                  flexWrap: 'wrap'
                }}>
                  {['Technique', 'Sparring', 'Drills', 'Competition', 'Notes'].map(tag => (
                    <button
                      key={tag}
                      style={{
                        padding: '6px 12px',
                        borderRadius: '8px',
                        fontSize: '12px',
                        backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
                        color: isDark ? '#a1a1aa' : '#71717a',
                        border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`,
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.backgroundColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.06)';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.backgroundColor = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)';
                      }}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'more' && (
          <div style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <div style={{textAlign: 'center', color: isDark ? '#71717a' : '#a1a1aa'}}>
              <div style={{fontSize: '18px', fontWeight: '500'}}>More Options Coming Soon</div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} isDark={isDark} />
    </div>
  );
}; 

export default App;