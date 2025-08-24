export interface NewsItem {
  _id: string;
  section?: string;
  tags?: string[];
  createdDate?: string;
  itemTitle: string;
  // itemText?: string;
  body: JSON;
  submitter?: string;
  updates?: string[];
  published?: boolean;
  publishedDate?: string;
  email?: string;
  createdAt?: string;
  updatedAt?: string;
}
