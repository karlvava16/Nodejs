import { Model, Column, DataType, Table } from 'sequelize-typescript';

@Table({
    timestamps: false,
    tableName: 'category',
})
export class Category extends Model {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
    id!: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    title!: string;
}
