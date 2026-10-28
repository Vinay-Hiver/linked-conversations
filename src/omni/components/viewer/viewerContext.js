import React from 'react';

// Opens linked conversations in the tabbed conversation viewer (see ConversationViewer.jsx).
export const ConversationViewerContext = React.createContext({ open: () => {}, canOpen: () => false });

export const useConversationViewer = () => React.useContext(ConversationViewerContext);
