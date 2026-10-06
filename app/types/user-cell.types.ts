export interface UserCellProps {
  avatar: Nullable<string>
  name: Nullable<string>
  userId: Nullable<number>
  callback: (userId: Nullable<number>) => void
}
