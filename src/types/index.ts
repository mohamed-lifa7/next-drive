import type{ ColumnDef, Table } from "@tanstack/react-table";
import type { profileFormSchema, feedbackFormSchema } from "./schema";
import type { z } from "zod";

/**
 * Represents properties of a User.
 */
interface UserProps {
	id?:string;
    email:string;
	image?: string;
	createdAt?:unknown;
	name?: string;
	email_verified:Date|null;
}

/**
 * Represents properties of a File.
 */
interface FileProps {
	id?:string;
	name: string;
	mimeSize: number;
	url:string;
  	mimeType: string;
  	createdAt?: Date;
	parentFolder?:string | null;
	owner: string;
	sharedWith: string[];

}

/**
 * Represents properties of a Folder.
 */
interface FolderProps {
	id?:string;
  	name: string;
  	createdAt?: Date;
	parentId?: string | null;
	owner: string;
}


/**
 * Represents properties of a TestimonialsProps.
 */
interface TestimonialsProps {
	id:string;
	name: string;
	username: string;
	avatar?: string;
	content:string;
}

/**
 * Represents properties of a FeaturesProps.
 */
interface FeatureProps {
	id:string;
	title: string;
}

/**
 * Represents properties of a SidebarNav props of drive page.
 */
interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
	items: {
	  href: string;
	  title: string;
	}[]
}

/**
 * Represents properties of a table row (file or folder).
 */
interface TableRow  {
	id:string;
	name:string;
	type : 'file' | 'folder';
	owner:string;
	updatedAt:string;
	mimSize:string;
}

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
}
interface DataTablePaginationProps<TData> {
  	table: Table<TData>
}
interface DataTableViewOptionsProps<TData> {
	table: Table<TData>
}
interface DataTableToolbarProps<TData> {
  	table: Table<TData>
}

/**
 * Represents properties for profile form.
 */
type ProfileFormValues = z.infer<typeof profileFormSchema>

/**
 * Represents properties for feedback form.
 */
type FeedbackProps = z.infer<typeof feedbackFormSchema> & {
	createdAt:unknown,
	email:string,
};
  

export type {
    UserProps,
	FileProps,
	FolderProps,
	TestimonialsProps,
	FeatureProps,
	SidebarNavProps,
	TableRow,
	DataTableProps,
	DataTablePaginationProps,
	DataTableViewOptionsProps,
	DataTableToolbarProps,
	ProfileFormValues,
	FeedbackProps,
}