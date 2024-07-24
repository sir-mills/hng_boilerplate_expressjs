import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";
import { User } from "./user";
import { UserOrganization } from "./user-organisation";

@Entity()
export class Payment {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => UserOrganization, { nullable: true })
  organization: UserOrganization;

  @Column("decimal", { precision: 10, scale: 2 })
  amount: number;

  @Column()
  currency: string;

  @Column({ unique: true })
  paystackReference: string;

  @Column({
    type: "enum",
    enum: ["pending", "success", "failed"],
    default: "pending",
  })
  status: "pending" | "success" | "failed";

  @Column()
  paymentMethod: string;

  @Column("jsonb", { nullable: true })
  metadata: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
