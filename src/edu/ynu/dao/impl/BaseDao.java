package edu.ynu.dao.impl;

import org.hibernate.Criteria;
import org.hibernate.Hibernate;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Projections;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate4.HibernateTemplate;

import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.util.List;

public class BaseDao<T>  {
    private SessionFactory sessionFactory;
    private Class<T> poclazz;
    public BaseDao(SessionFactory sessionFactory){
        this.sessionFactory = sessionFactory;
        Type genericSuperclass = this.getClass().getGenericSuperclass();
        Type[] params = ((ParameterizedType) genericSuperclass).getActualTypeArguments();
        poclazz = null;
        if ((params.length > 0) && (params[0] != null)){
            poclazz = (Class) params[0];
        }
    }
    public Session currentSession(){
        return this.sessionFactory.getCurrentSession();
    }

    private String getClazzName(){
        return poclazz.getSimpleName();
    }
    public T find(Integer id){
        return (T)currentSession().get(poclazz,id);
    }
    public List<T> findAll(){
        String hql = "from " + poclazz.getSimpleName();
        return currentSession().createQuery(hql).list();
    }
    public void saveOrUpdate(T entity){
        currentSession().saveOrUpdate(entity);
    }
    public void delete(T entity){
        currentSession().delete(entity);
    }
    public void update(T entity){
        currentSession().update(entity);
    }
    public void save(T entity){
        currentSession().save(entity);
    }
    public void deleteById(Integer id){
        T entity = (T)currentSession().get(poclazz,id);
        currentSession().delete(entity);
    }
    public List<T> listByCriteria(DetachedCriteria detachedCriteria ,Integer countPerPage,Integer pageNum){
        Criteria criteria = detachedCriteria.getExecutableCriteria(currentSession());
        criteria.setFirstResult((pageNum-1)*countPerPage);
        criteria.setMaxResults(countPerPage);
        List<T> list = criteria.list();
        return list;
    }
    public Integer countByCriteria(DetachedCriteria detachedCriteria){
        Criteria criteria = detachedCriteria.getExecutableCriteria(currentSession());
        criteria.setProjection(Projections.rowCount());
        Long count =  (Long)criteria.list().get(0);
        return count.intValue();
    }
    public T findByCriteria(DetachedCriteria detachedCriteria){
        Criteria criteria = detachedCriteria.getExecutableCriteria(currentSession());
        List<T> list = criteria.list();
        return  list.size() == 0 ? null : list.get(0);
    }
    public List<T> listByCriteria(DetachedCriteria detachedCriteria){
        Criteria criteria = detachedCriteria.getExecutableCriteria(currentSession());
        List<T> list = criteria.list();
        return list;
    }
}
