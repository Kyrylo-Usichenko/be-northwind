import { SearchService } from '@/services/Search';
import { Request, Response } from 'express';
import Controller from '.';

class SearchController extends Controller {
	constructor(private serach: SearchService) {
		super('/search');
		this.router.get('/', this.getSearched);
	}

	private getSearched = (req: Request, res: Response) => {
		const searchType = req.query.type;
		const searchValue = req.query.value;
		if (searchType !== 'customers' && searchType !== 'suppliers') {
			return res.status(400).json({ message: 'Invalid search type' });
		}
		if (typeof searchValue !== 'string') {
			return res.status(400).json({ message: 'Missing search value' });
		}
		const results = this.serach.getSearched(searchType, searchValue);
		return res.send(results);
	};
}
export default SearchController;
