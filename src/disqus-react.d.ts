declare module 'disqus-react' {
  import * as React from 'react';

  export interface DiscussionEmbedConfig {
    url?: string;
    identifier?: string;
    title?: string;
    language?: string;
    category_id?: string;
  }

  export interface DiscussionEmbedProps {
    shortname: string;
    config: DiscussionEmbedConfig;
  }

  export class DiscussionEmbed extends React.Component<DiscussionEmbedProps> {}

  export interface CommentCountConfig {
    url?: string;
    identifier?: string;
    title?: string;
  }

  export interface CommentCountProps {
    shortname: string;
    config: CommentCountConfig;
    children?: React.ReactNode;
  }

  export class CommentCount extends React.Component<CommentCountProps> {}

  export interface CommentEmbedProps {
    commentId: string;
    showMedia?: boolean;
    showParentComment?: boolean;
    width?: number;
    height?: number;
  }

  export class CommentEmbed extends React.Component<CommentEmbedProps> {}
}
