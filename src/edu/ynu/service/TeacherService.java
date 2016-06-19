package edu.ynu.service;

public interface TeacherService {

	/**
	 * description: 分页查询已完成的申报项目(ProType = 采购完成)的分页数
	 * @param userId 
	 * @return 页数
	 */
	Integer findSubmitHistoryByIdCompletedPageCount(String userId);

	/**
	 * description: 分页查询未完成的申报项目(ProType ！= 采购完成)的分页数
	 * @param userId 
	 * @return 页数
	 */
	Integer findSubmitHistoryByIdUnCompletedPageCount(String userId);

}
