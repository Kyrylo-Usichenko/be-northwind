import { OrdersService } from '@/services/orders';
import { Request, Response } from 'express';
import Controller from '.';

class OrdersController extends Controller {
	constructor(private orders: OrdersService) {
		super('/orders');
		this.router.get('/', this.getAll);
	}
	public getAll = (req: Request, res: Response) => {
		const page = Number(req.query.page) || 1;
		const count = Number(req.query.count) || 20;
		const start = (page - 1) * count;
		const response = this.orders.getAll(start, count);
		return res.send(response);
	};
}
export default OrdersController;
