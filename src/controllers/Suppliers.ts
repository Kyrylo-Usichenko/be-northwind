import { SuppliersService } from '@/services/Suppliers';
import { Request, Response } from 'express';
import Controller from '.';

class SuppliersController extends Controller {
	constructor(private suppliers: SuppliersService) {
		super('/suppliers');
		this.router.get('/', this.getAll);
		this.router.get('/:id', this.getOne);
	}
	private getAll = async (req: Request, res: Response) => {
		const page = Number(req.query.page) || 1;
		const count = Number(req.query.count) || 20;
		const start = (page - 1) * count;
		const response = this.suppliers.getAll(start, count);
		return res.send(response);
	};
	private getOne = async (req: Request, res: Response) => {
		const id = req.params.id;
		if (!id) {
			return res.status(400).json({ message: 'Missing id' });
		}
		const idNumber = Number(id);
		const customer = this.suppliers.getOne(idNumber);
		if (!customer) {
			return res.status(404).json({ message: 'Customer not found' });
		}
		return res.send(customer);
	};
}
export default SuppliersController;
