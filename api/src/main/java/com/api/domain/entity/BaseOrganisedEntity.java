package com.api.domain.entity;

import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MappedSuperclass;

@MappedSuperclass
public abstract class BaseOrganisedEntity extends BaseEntity implements BaseOrganisedEntityInterface {
    //bi-directional many-to-one association to Organisation
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "organisationId", nullable = false)
    protected Organisation organisation;

    public Organisation getOrganisation() {
        return this.organisation;
    }

    public void setOrganisation(Organisation organisation) {
        this.organisation = organisation;
    }
}