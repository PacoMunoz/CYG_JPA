package es.pmg.jhipster.service;

import java.util.List;

import javax.persistence.criteria.JoinType;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import io.github.jhipster.service.QueryService;

import es.pmg.jhipster.domain.Option;
import es.pmg.jhipster.domain.*; // for static metamodels
import es.pmg.jhipster.repository.OptionRepository;
import es.pmg.jhipster.service.dto.OptionCriteria;

/**
 * Service for executing complex queries for {@link Option} entities in the database.
 * The main input is a {@link OptionCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link Option} or a {@link Page} of {@link Option} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class OptionQueryService extends QueryService<Option> {

    private final Logger log = LoggerFactory.getLogger(OptionQueryService.class);

    private final OptionRepository optionRepository;

    public OptionQueryService(OptionRepository optionRepository) {
        this.optionRepository = optionRepository;
    }

    /**
     * Return a {@link List} of {@link Option} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<Option> findByCriteria(OptionCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specification<Option> specification = createSpecification(criteria);
        return optionRepository.findAll(specification);
    }

    /**
     * Return a {@link Page} of {@link Option} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<Option> findByCriteria(OptionCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specification<Option> specification = createSpecification(criteria);
        return optionRepository.findAll(specification, page);
    }

    /**
     * Return the number of matching entities in the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the number of matching entities.
     */
    @Transactional(readOnly = true)
    public long countByCriteria(OptionCriteria criteria) {
        log.debug("count by criteria : {}", criteria);
        final Specification<Option> specification = createSpecification(criteria);
        return optionRepository.count(specification);
    }

    /**
     * Function to convert ConsumerCriteria to a {@link Specification}
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching {@link Specification} of the entity.
     */    
    protected Specification<Option> createSpecification(OptionCriteria criteria) {
        Specification<Option> specification = Specification.where(null);
        if (criteria != null) {
            if (criteria.getId() != null) {
                specification = specification.and(buildSpecification(criteria.getId(), Option_.id));
            }
            if (criteria.getName() != null) {
                specification = specification.and(buildStringSpecification(criteria.getName(), Option_.name));
            }
            if (criteria.getDescription() != null) {
                specification = specification.and(buildStringSpecification(criteria.getDescription(), Option_.description));
            }
            if (criteria.getOfferId() != null) {
                specification = specification.and(buildSpecification(criteria.getOfferId(),
                    root -> root.join(Option_.offer, JoinType.LEFT).get(Offer_.id)));
            }
        }
        return specification;
    }
}
