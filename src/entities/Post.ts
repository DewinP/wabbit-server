import { Field, ObjectType } from "type-graphql";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { User } from "./user";
import { Comment } from "./Comment";
import { Length } from "class-validator";

@ObjectType()
@Entity()
export class Post extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Length(5, 75)
  @Column()
  title!: string;

  @Field()
  @Column()
  body!: string;

  @Field()
  @Column({ type: "int", default: 0 })
  votes!: number;

  @OneToMany(() => Comment, (comment) => comment.post, { eager: true })
  comments: Comment[];

  @Field()
  @Column()
  creatorId!: number;

  @Field()
  @ManyToOne(() => User, (user) => user.posts, { eager: true })
  creator: User;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
